import { useEffect, useState } from 'react';
import type { Registros } from '../componentes/procesador/Registros';
import './ProcesadorVista.css';
import BCP from "../componentes/procesos/BCP";

const ProcesadorVista: React.FC<{ registros: Registros, bcp: BCP | null }> = ({ registros, bcp }) => {
  const [ax, setAx] = useState(0);
  const [bx, setBx] = useState(0);
  const [cx, setCx] = useState(0);
  const [dx, setDx] = useState(0);
  const [ac, setAc] = useState(0);
  const [pid, setPid] = useState(0);
  const [estado, setEstado] = useState('');
  const [prioridad, setPrioridad] = useState(0);

  useEffect(() => {
    if (bcp) {
      setPid(bcp.getPID());
      setEstado(bcp.getEstado());
      setPrioridad(bcp.getPrioridad());
    }
    if (registros) {
      setAx(registros.AX);
      setBx(registros.BX);
      setCx(registros.CX);
      setDx(registros.DX);
      setAc(registros.AC);
    }
  }, [registros]);

  return (
    <div className="procesadorVista">
      <h2>Procesador | PID: {pid} | Estado: {estado} | Prioridad: {prioridad}</h2>
      <div className="gridRegistros">
        <div className="celdaRegistro">
          <label>AX</label>
          <input type="number" value={ax} onChange={(e) => setAx(Number(e.target.value))} />
        </div>
        <div className="celdaRegistro">
          <label>BX</label>
          <input type="number" value={bx} onChange={(e) => setBx(Number(e.target.value))} />
        </div>
        <div className="celdaRegistro">
          <label>CX</label>
          <input type="number" value={cx} onChange={(e) => setCx(Number(e.target.value))} />
        </div>
        <div className="celdaRegistro">
          <label>DX</label>
          <input type="number" value={dx} onChange={(e) => setDx(Number(e.target.value))} />
        </div>
        <div className="celdaRegistro ac">
          <label>AC</label>
          <input type="number" value={ac} onChange={(e) => setAc(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
};

export default ProcesadorVista;
