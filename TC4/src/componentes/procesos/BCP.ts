import type { Registros } from '../procesador/Registros';
import type { Instruccion } from '../procesador/Instruccion';

class BCP {
    private PID: number;
    private Estado: string;
    private Prioridad: number;
    private Registros: Registros;
    private Instrucciones: Instruccion[];
    private InstruccionActual: number;
    private TiempoLlegada: number;
    private TiempoFinalizacion: number;
    private TiempoEspera: number;

    public constructor(
        PID: number,
        Estado: string,
        Prioridad: number,
        Registros: Registros,
        Instrucciones: Instruccion[]
    ) {
        this.PID = PID;
        this.Estado = Estado;
        this.Prioridad = Prioridad;
        this.Registros = Registros;
        this.Instrucciones = Instrucciones;
        this.InstruccionActual = 0;
        this.TiempoLlegada = 0;
        this.TiempoFinalizacion = 0;
        this.TiempoEspera = 0;
    }

    public getPID(): number {
        return this.PID;
    }

    public getEstado(): string {
        return this.Estado;
    }

    public setEstado(estado: string): void {
        this.Estado = estado;
    }

    public getPrioridad(): number {
        return this.Prioridad;
    }

    public setPrioridad(prioridad: number): void {
        this.Prioridad = prioridad;
    }

    public getRegistros(): Registros {
        return this.Registros;
    }

    public setRegistros(registros: Registros): void {
        this.Registros = registros;
    }

    public getInstrucciones(): Instruccion[] {
        return this.Instrucciones;
    }

    public getInstruccionActual(): number {
        return this.InstruccionActual;
    }

    public getTiempoLlegada(): number {
        return this.TiempoLlegada;
    }

    public setTiempoLlegada(tiempo: number): void {
        this.TiempoLlegada = tiempo;
    }

    public getTiempoFinalizacion(): number {
        return this.TiempoFinalizacion;
    }

    public setTiempoFinalizacion(tiempo: number): void {
        this.TiempoFinalizacion = tiempo;
    }

    public incrementarInstruccionActual(): void {
        if (this.InstruccionActual < this.Instrucciones.length) {
            this.InstruccionActual++;
        }
    }

    public resetInstruccionActual(): void {
        this.InstruccionActual = 0;
    }

    public isFinished(): boolean {
        return this.InstruccionActual >= this.Instrucciones.length;
    }

    public incrementarTiempoEspera(): void {
        this.TiempoEspera++;
    }

    public getTiempoEspera(): number {
        return this.TiempoEspera;
    }
}

export default BCP;