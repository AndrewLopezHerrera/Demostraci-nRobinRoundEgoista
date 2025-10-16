import Procesador from "../procesador/Procesador";
import type { Registros } from "../procesador/Registros";
import  BCP from "./BCP";
import ColaProcesos from "./ColaProcesos";
import type { RespuestaGestor } from "./RespuestaGestor";
import MatrizProcesos from "./MatrizProcesos";
import Cargador from "../cargador/Cargador";

class Gestor {
    private TiempoActual: number;
    private ColaAceptados: ColaProcesos;
    private ColaEspera: ColaProcesos;
    private Quantum: number;
    private ProcesadorActual: Procesador;
    private ContadorQuantum: number;
    private Matriz: MatrizProcesos;
    private TasaA: number;
    private TasaB: number;
    private BCPActual: BCP | null;
    private CargadorProgramas: Cargador

    public constructor(quantum: number) {
        this.TiempoActual = 0;
        this.ColaAceptados = new ColaProcesos();
        this.ColaEspera = new ColaProcesos();
        this.Quantum = quantum;
        this.ProcesadorActual = new Procesador();
        this.ContadorQuantum = 0;
        this.TasaA = 2;
        this.TasaB = 1;
        this.BCPActual = null;
        this.Matriz = new MatrizProcesos(0, 0);
        this.CargadorProgramas = new Cargador();
    }

    public Ejecutar(): RespuestaGestor {
        this.CargarProgramaANuevos();
        this.CargarProgramaAAceptados();
        this.OrdenarColaPorPrioridad();
        this.CambiarContexto();
        this.EjecutarProcesoActual();
        this.TiempoActual++;
        this.ActualizarTiempos();
        this.ActualizarPrioridades();
        console.log("Quantum contador: " + this.ContadorQuantum);
        return this.CrearRespuesta();
    }

    private CrearRespuesta(): RespuestaGestor {
        const respuesta : RespuestaGestor = {
            ProcesoActual: this.BCPActual!,
            ColaProcesosAceptados: this.ColaAceptados.getPresentacionColaProcesos(),
            ColaProcesosEspera: this.ColaEspera.verProcesos(),
            TiempoActual: this.TiempoActual,
            Quantum: this.Quantum,
            MatrizProcesos: this.Matriz.getMatriz(),
            ContadorQuantum: this.ContadorQuantum,
            TasaA: this.TasaA,
            TasaB: this.TasaB
        };
        return respuesta;
    }

    private CargarProgramaANuevos(): void {
        const probabilidad = Math.random();
        if (probabilidad < 0.3) {
            const programa = this.CargadorProgramas.cargarPrograma();
            if (programa) {
                const filas = this.Matriz.getFilas();
                const nuevoProceso = new BCP(
                    filas,
                    "Nuevo",
                    0,
                    { AC: 0, AX: 0, BX: 0, CX: 0, DX: 0},
                    programa
                );
                nuevoProceso.setTiempoLlegada(this.TiempoActual);
                this.ColaEspera.agregarProceso(nuevoProceso);
                this.Matriz.aumentarFilas();
            }
        }      
    }

    private CargarProgramaAAceptados(){
        if(this.ColaAceptados.tamaño() < 5) {
            const programa = this.ColaEspera.eliminarProceso();
            if (programa) {
                programa.setEstado("Listo");
                this.ColaAceptados.agregarProceso(programa);
            }
        }
    }

    private ActualizarTiempos(): void {
        this.ColaAceptados.verProcesos().forEach((proceso) => {
            proceso.incrementarTiempoEspera();
        });
        this.ColaEspera.verProcesos().forEach((proceso) => {
            proceso.incrementarTiempoEspera();
        });
    }

    private CambiarContexto(): void {
        if (this.Quantum <= this.ContadorQuantum || this.ColaAceptados.estaVacia()) {
            const proceso = this.ColaAceptados.eliminarProceso();
            this.ContadorQuantum = 0;
            if (proceso) {
                let registros: Registros = this.ProcesadorActual.getRegistros();
                if (this.BCPActual && this.BCPActual.getInstrucciones().length > this.BCPActual.getInstruccionActual()) {
                    this.BCPActual.setEstado("Listo");
                    this.ColaAceptados.agregarProceso(this.BCPActual);
                    this.BCPActual.setRegistros(registros);
                }
                this.BCPActual = proceso;
                this.BCPActual.setEstado("Ejecutando");
                registros = this.BCPActual.getRegistros();
                this.ProcesadorActual.setRegistros(registros);
                this.ContadorQuantum = 0;
            }
        }
    }

    private ActualizarPrioridades(): void {
        this.ColaAceptados.verProcesos().forEach((proceso) => {
            const tiempoEspera = proceso.getTiempoEspera();
            const aumento = tiempoEspera * this.TasaB;
            proceso.setPrioridad(proceso.getPrioridad() + aumento);
        });
        this.ColaEspera.verProcesos().forEach((proceso) => {
            const tiempoEspera = proceso.getTiempoEspera();
            const aumento = tiempoEspera * this.TasaA;
            proceso.setPrioridad(proceso.getPrioridad() + aumento);
        });
    }

    private OrdenarColaPorPrioridad(): void {
        this.ColaAceptados.OrdenarPorPrioridad();
        this.ColaEspera.OrdenarPorPrioridad();
    }

    private EjecutarProcesoActual(): void {
        this.ContadorQuantum++;
        if (this.BCPActual) {
            const posicion : number = this.BCPActual.getInstruccionActual();
            const instrucciones = this.BCPActual.getInstrucciones();
            if (posicion < instrucciones.length) {
                this.Matriz.aumentarColumnas();
                const instruccion = instrucciones[posicion];
                this.ProcesadorActual.EjecutarInstruccion(instruccion);
                this.Matriz.setValor(this.BCPActual.getPID(), this.TiempoActual, "X"); // Marca de ejecución
                this.BCPActual.incrementarInstruccionActual();
            }
            else {
                this.BCPActual.setEstado("Terminado");
                this.BCPActual.setTiempoFinalizacion(this.TiempoActual);
                this.BCPActual = null;
                this.ContadorQuantum = this.Quantum; // Forzar cambio de contexto
            }
        }
    }
}
export default Gestor;