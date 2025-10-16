import type { Registros } from "./Registros";
import type { Instruccion } from "./Instruccion";

class Procesador {
    private AX: number;
    private BX: number;
    private CX: number;
    private DX: number;
    private AC: number;

    public constructor() {
        this.AX = 0;
        this.BX = 0;
        this.CX = 0;
        this.DX = 0;
        this.AC = 0;
    }

    public getRegistros(): Registros {
        return {
            AX: this.AX,
            BX: this.BX,
            CX: this.CX,
            DX: this.DX,
            AC: this.AC
        };
    }

    public setRegistros(registros: Registros): void {
        this.AX = registros.AX;
        this.BX = registros.BX;
        this.CX = registros.CX;
        this.DX = registros.DX;
        this.AC = registros.AC;
    }

    public EjecutarInstruccion(instruccion: Instruccion): void {
        const { Operacion, Operando1, Operando2 } = instruccion;
        switch (Operacion.toUpperCase()) {
            case "MOV":
                this.MoverRegistro(Operando1, Operando2);
                break;
            case "ADD":
                this.SumarRegistro(Operando1);
                break;
            case "SUB":
                this.RestarRegistro(Operando1);
                break;
            case "LI":
                this.CargarEntero(Operando1, parseInt(Operando2 || "0"));
                break;
            default:
                throw new Error(`Operación desconocida: ${Operacion}`);
        }
    }

    private MoverRegistro(destino: string, origen: string | undefined): void {
        destino = destino.toUpperCase();
        origen = origen ? origen.toUpperCase() : undefined;
        if (!origen) {
            throw new Error("El operando de origen es obligatorio para la instrucción MOV.");
        }
        const valorOrigen = this.getValorRegistro(origen);
        if (valorOrigen !== undefined) {
            this.CargarEntero(destino, valorOrigen);
        } else {
            throw new Error(`Registro desconocido: ${origen}`);
        }
    }

    private CargarEntero(destino: string, valor: number): void {
        switch (destino.toUpperCase()) {
            case "AX":
                this.AX = valor;
                break;
            case "BX":
                this.BX = valor;
                break;
            case "CX":
                this.CX = valor;
                break;
            case "DX":
                this.DX = valor;
                break;
            case "AC":
                this.AC = valor;
                break;
            default:
                throw new Error(`Registro desconocido: ${destino}`);
        }
    }

    private SumarRegistro(registro: string): void {
        const valorActual = this.getValorRegistro(registro);
        if (valorActual !== undefined) {
            this.CargarEntero("AC", this.AC + valorActual);
        } else {
            throw new Error(`Registro desconocido: ${registro}`);
        }
    }

    private RestarRegistro(registro: string): void {
        const valorActual = this.getValorRegistro(registro);
        if (valorActual !== undefined) {
            this.CargarEntero("AC", this.AC - valorActual);
        } else {
            throw new Error(`Registro desconocido: ${registro}`);
        }
    }

    private getValorRegistro(registro: string): number | undefined {
        switch (registro.toUpperCase()) {
            case "AX":
                return this.AX;
            case "BX":
                return this.BX;
            case "CX":
                return this.CX;
            case "DX":
                return this.DX;
            case "AC":
                return this.AC;
            default:
                return undefined;
        }
    }
}

export default Procesador;