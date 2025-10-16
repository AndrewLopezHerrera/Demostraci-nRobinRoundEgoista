import type { PresentacionColaProcesos } from '../componentes/procesos/PresentacioColaProcesos';
import './VistaColaProcesos.css';

const VistaColaProcesos: React.FC<{ cola: PresentacionColaProcesos }> = ({ cola }) => {
    const procesos = [
        cola.Proceso1,
        cola.Proceso2,
        cola.Proceso3,
        cola.Proceso4,
        cola.Proceso5
    ];

    return (
        <div className="contenedorColaProcesos">
            <h2>Cola de Procesos</h2>

            <div className="tablaColaProcesosVertical">
                <div className="encabezadoVertical">Orden</div>
                <div className="encabezadoVertical">Proceso</div>

                {procesos.map((p, index) => (
                    <>
                        <div key={`orden-${index}`} className="celdaEncabezado">
                            {index + 1 === 1 ? "Primero" :
                             index + 1 === 2 ? "Segundo" :
                             index + 1 === 3 ? "Tercero" :
                             index + 1 === 4 ? "Cuarto" : "Quinto"}
                        </div>
                        <div
                            key={`proc-${index}`}
                            className={`celdaProceso ${index === 0 ? 'proximo' : ''}`}
                        >
                            {p || '—'}
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default VistaColaProcesos;
