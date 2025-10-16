import BCP from "../componentes/procesos/BCP";
import "./VistaColaEspera.css";

const VistaColaEspera: React.FC<{ cola: BCP[] }> = ({ cola }) => {
  return (
    <div className="contenedorColaEspera">
      <h2>Cola de Espera</h2>

      {cola.length === 0 ? (
        <p className="sinProcesos">No hay procesos en espera</p>
      ) : (
        <div className="listaCola">
          {cola.map((proceso, index) => (
            <div
              key={index}
              className={`tarjetaProceso ${
                index === 0 ? "proximo" : ""
              } ${proceso.getEstado().toLowerCase()}`}
            >
              <div className="posicion">#{index + 1}</div>
              <div className="detallesProceso">
                <p><strong>PID:</strong> {proceso.getPID()}</p>
                <p><strong>Estado:</strong> {proceso.getEstado()}</p>
                <p><strong>Prioridad:</strong> {proceso.getPrioridad()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VistaColaEspera;
