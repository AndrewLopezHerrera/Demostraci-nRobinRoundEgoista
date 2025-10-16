import Programas from "./Programas.json";

class Cargador {

    private CantidadProgramas: number;
    private ProgramaActual: number;

    public constructor() {
        this.CantidadProgramas = Programas.length;
        this.ProgramaActual = 0;
    }

    public cargarPrograma(): any[] | null {
        if(this.ProgramaActual >= this.CantidadProgramas) {
            return null;
        }
        const programa = Programas[this.ProgramaActual];
        this.ProgramaActual++;
        return programa;
    }
}

export default Cargador;