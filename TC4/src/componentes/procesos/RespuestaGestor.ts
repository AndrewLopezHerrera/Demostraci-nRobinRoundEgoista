import BCP from "./BCP";
import type { PresentacionColaProcesos } from "./PresentacioColaProcesos";

interface RespuestaGestor {
    ProcesoActual: BCP;
    ColaProcesosAceptados: PresentacionColaProcesos;
    ColaProcesosEspera: BCP[]
    TiempoActual: number;
    Quantum: number;
    ContadorQuantum: number;
    MatrizProcesos: string[][];
    TasaA: number;
    TasaB: number;
}

export type { RespuestaGestor };