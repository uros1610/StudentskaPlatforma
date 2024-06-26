import { Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import { useState } from "react";
import ObavjestenjaGlavnaStranica from "./components/ObavjestenjaGlavnaStranica";
import ObavjestenjaPredmet from "./components/ObavjestenjaPredmet";
import NovoObavjestenje from "./components/NovoObavjestenje";
function App() {
  const [socket,setSocket] = useState(null);
  return (
    <div className="App">
      <Routes>
      <Route path = '/' element = {<Login/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/notifications' element = {<ObavjestenjaGlavnaStranica/>}/>
      <Route path = '/notifications/:imePredmeta/:imeSmjera/:imeFakulteta' element = {<ObavjestenjaPredmet/>}/>
      <Route path = '/newNotification/:imePredmeta/:imeSmjera/:imeFakulteta' element = {<NovoObavjestenje/>}/>
      <Route path = '/editNotification/:id' element = {<NovoObavjestenje type = "edit"/>}/>

      </Routes>
      
    </div>
  );
}

export default App;
