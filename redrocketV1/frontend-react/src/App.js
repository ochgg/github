import People from "./components/user/People";
import { Routing } from "./router/Routing";


function App() {
  return (
    <div className="layout">
      
      {/*Cargando toda la config de rutas */}
      <Routing/>
     

    </div>
  );
}

export default App;
