import { useState } from 'react'
import './App.css'
import VistaTablaEjecución from './vistaProcesos/VistaTablaEjecución'
import ProcesadorVista from './vistaComponentes/ProcesadorVista';
import type { Registros } from './componentes/procesador/Registros';
import VistaColaProcesos from './vistaProcesos/VistaColaProcesos';
import type { PresentacionColaProcesos } from './componentes/procesos/PresentacioColaProcesos';
import Gestor from './componentes/procesos/Gestor';
import BCP from './componentes/procesos/BCP';
import VistaColaEspera from './vistaProcesos/VistaColaEspera';
import './AppMain.css'

function App() {
  const [matriz, setMatriz] = useState([[]] as string[][]);
  const [filas, setFilas] = useState(0);
  const [columnas, setColumnas] = useState(0);

  const [registros, setRegistros] = useState({ AC: 0, AX: 0, BX: 0, CX: 0, DX: 0} as Registros);

  const [colaProcesosAceptados, setColaProcesosAceptados] = useState({} as PresentacionColaProcesos);
  const [colaProcesosEspera, setColaProcesosEspera] = useState([] as BCP[]);  

  const [gestor] = useState(new Gestor(7));

  const [intervalID, setIntervalID] = useState<number>(0);

  const [BCPActual, setBCPActual] = useState<BCP | null>(null);

  const EjecutarAutomaticamente = () => {
    const id = setInterval(() => {
      const respuesta = gestor.Ejecutar();
      setMatriz(respuesta.MatrizProcesos);
      setFilas(respuesta.MatrizProcesos.length);
      setColumnas(respuesta.MatrizProcesos[0].length);
      setRegistros(respuesta.ProcesoActual.getRegistros());
      setColaProcesosAceptados(respuesta.ColaProcesosAceptados);
      setColaProcesosEspera(respuesta.ColaProcesosEspera);
      setBCPActual(respuesta.ProcesoActual);
    }, 500);
    setIntervalID(id);
  };

  const PausarEjecucion = () => {
    clearInterval(intervalID);
  }

  return (
    <div className='mainContainer'>
      <h1 className='title'>Simulador de Procesos Robin Round Egoísta</h1>
      <div className='actions_buttons_container'>
        <button onClick={EjecutarAutomaticamente}>Ejecutar Automáticamente</button>
        <button onClick={PausarEjecucion}>Pausar Ejecución</button>
      </div>
      <div className='displays_process_container'>
        <div>
          <VistaColaProcesos cola={colaProcesosAceptados} />
        </div>
        <div style={{height: '100%'}}>
          <VistaColaEspera cola={colaProcesosEspera} />
        </div>
        <div>
          <ProcesadorVista registros={registros} bcp={BCPActual} />
        </div>
      </div>
      <div  className='matrix_process_container'>
        <VistaTablaEjecución 
          matrizNueva={matriz}
          filasNuevas={filas}
          columnasNuevas={columnas}
        />
      </div>
    </div>
  )
}

export default App
