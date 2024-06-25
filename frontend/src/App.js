import { Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import { useState } from "react";
import ObavjestenjaGlavnaStranica from "./components/ObavjestenjaGlavnaStranica";
import ObavjestenjaPredmet from "./components/ObavjestenjaPredmet";
function App() {
  const [socket,setSocket] = useState(null);
  return (
    <div className="App">
      <Routes>
      <Route path = '/' element = {<Login/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/notifications' element = {<ObavjestenjaGlavnaStranica/>}/>
      <Route path = '/notifications/:imePredmeta/:imeSmjera/:imeFakulteta' element = {<ObavjestenjaPredmet/>}/>

      </Routes>
      
    </div>
  );
}

export default App;
