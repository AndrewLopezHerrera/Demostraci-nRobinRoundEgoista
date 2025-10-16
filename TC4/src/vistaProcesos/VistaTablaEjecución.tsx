import { useState, useEffect } from 'react';
import "./VistaTablaEjecucion.css";

const VistaTablaEjecucion: React.FC<{
    matrizNueva: string[][],
    filasNuevas: number,
    columnasNuevas: number
}> = ({ matrizNueva, filasNuevas, columnasNuevas }) => {

    const [filas, setFilas] = useState(0);
    const [columnas, setColumnas] = useState(0);
    const [matriz, setMatriz] = useState([] as string[][]);

    useEffect(() => {
        setFilas(filasNuevas);
        setColumnas(columnasNuevas);
        setMatriz(matrizNueva);
    }, [filasNuevas, columnasNuevas, matrizNueva]);

    return (
        <div className="contenedorTablaEjecucion">
            <div
                className="tablaEjecucionGrid"
                style={{
                    gridTemplateColumns: `150px repeat(${columnas}, 80px)`,
                    gridTemplateRows: `50px repeat(${filas}, 40px)`
                }}
            >
                {/* Celda vacía (esquina superior izquierda) */}
                <div className="celda encabezado"></div>

                {/* Encabezados de columnas (tiempos) */}
                {Array.from({ length: columnas }, (_, i) => (
                    <div key={`t-${i}`} className="celda encabezado">
                        {i}
                    </div>
                ))}

                {/* Filas con nombre de proceso + sus celdas */}
                {Array.from({ length: filas }, (_, filaIndex) => (
                    <>
                        {/* Nombre del proceso */}
                        <div key={`p-${filaIndex}`} className="celda encabezado">
                            P{filaIndex}
                        </div>

                        {/* Celdas de ejecución */}
                        {Array.from({ length: columnas }, (_, colIndex) => (
                            <div
                                key={`${filaIndex}-${colIndex}`}
                                className="celda"
                            >
                                {matriz[filaIndex]?.[colIndex] || ""}
                            </div>
                        ))}
                    </>
                ))}
            </div>
        </div>
    );
};

export default VistaTablaEjecucion;
