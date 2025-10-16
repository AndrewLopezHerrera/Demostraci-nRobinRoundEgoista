class MatrizProcesos {
    private matriz: string[][];
    private filas: number;
    private columnas: number;

    constructor(filas: number, columnas: number) {
        this.filas = filas;
        this.columnas = columnas;
        this.matriz = Array.from({ length: filas }, () => Array(columnas).fill(''));
    }

    public setValor(fila: number, columna: number, valor: string) {
        this.matriz[fila][columna] = valor;
    }

    public getMatriz() {
        return this.matriz;
    }

    public aumentarFilas() {
        this.filas += 1;
        this.matriz.push(Array(this.columnas).fill(''));
    }

    public aumentarColumnas() {
        this.columnas += 1;
        this.matriz = this.matriz.map(fila =>
            [...fila, ...Array(1).fill('')]
        );
    }

    public getFilas() {
        return this.filas;
    }
    
    public getColumnas() {
        return this.columnas;
    }
}

export default MatrizProcesos;