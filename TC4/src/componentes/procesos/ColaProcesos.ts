import type BCP from "./BCP";
import type { PresentacionColaProcesos } from "./PresentacioColaProcesos";

class ColaProcesos {
    private procesos: BCP[];

    public constructor() {
        this.procesos = [];
    }

    public agregarProceso(proceso: BCP): void {
        this.procesos.push(proceso);
    }

    public eliminarProceso(): BCP | undefined {
        return this.procesos.shift();
    }

    public verProcesos(): BCP[] {
        return this.procesos;
    }

    public estaVacia(): boolean {
        return this.procesos.length === 0;
    }

    public tamaño(): number {
        return this.procesos.length;
    }

    public getPresentacionColaProcesos(): PresentacionColaProcesos {
        const presentacion: PresentacionColaProcesos = {
            Proceso1: "",
            Proceso2: "",
            Proceso3: "",
            Proceso4: "",
            Proceso5: ""
        };
        this.procesos.forEach((proceso : BCP, index : number) => {
            if (index < 5) {
                presentacion[`Proceso${index + 1}` as keyof PresentacionColaProcesos] = `PID: ${proceso.getPID()}, Estado: ${proceso.getEstado()}, Prioridad: ${proceso.getPrioridad()}`;
            }
        });
        return presentacion;
    }

    public OrdenarPorPrioridad(): void {
        this.procesos.sort((a, b) => b.getPrioridad() - a.getPrioridad());
    }
}

export default ColaProcesos;