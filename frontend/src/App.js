import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ObavjestenjaGlavnaStranica from "./components/ObavjestenjaGlavnaStranica";
import ObavjestenjaPredmet from "./components/ObavjestenjaPredmet";
import NovoObavjestenje from "./components/NovoObavjestenje";
import Home from './pages/Home';
import Profile from './pages/Profile';
import GradeSheet from "./pages/GradeSheet";
import InsertResults from './components/InsertResultsMainPage'
import Materials from "./pages/Materials";
import SubjectMaterials from "./components/SubjectMaterials";
import InsertResultsOneSubject from "./components/InsertResultsOneSubject";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/notifications/"
          element={
            <>
              <Header />
              <ObavjestenjaGlavnaStranica />
              <Footer />
            </>
          }
        />

        <Route
          path = "/notifications/:imePredmeta/:imeSmjera/:imeFakulteta/:id"
          element={
            <>
              <Header />
              <ObavjestenjaPredmet/>
              <Footer />
            </>}

            />
          

        <Route
          path="/newNotification/:imePredmeta/:imeSmjera/:imeFakulteta"
          element={
            
            <>
              <Header />
              <NovoObavjestenje />
              <Footer />
            </>
          }
        />
        <Route
          path="/editNotification/:id"
          element={
            <>
              <Header />
              <NovoObavjestenje type="edit" />
              <Footer />
            </>
          }
        />
        <Route
          path="/Home"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Header />
              <Profile />
              <Footer />
            </>
          }
        />
        <Route
          path="/grade-sheet"
          element={
            <>
              <Header />
              <GradeSheet />
              <Footer />
            </>
          }
        />

            <Route
            path = "/insert-results"
            element = {
              <>
              <Header/>
              <InsertResults/>
              <Footer/>
              </>
            }
        />

        <Route
          path = "/insert-results/:imePredmeta/:imeSmjera/:imeFakulteta"
          element = {
            <>
            <Header/>
            <InsertResultsOneSubject/>
            <Footer/>
            </>
          }
        />

         

        <Route
          path="/materials"
          element={
            <>
              <Header />
              <Materials />
              <Footer />
            </>
          }
        />
        <Route
          path="/materials/:imePredmeta/:imeSmjera/:imeFakulteta/:id"
          element={
            <>
              <Header />
              <SubjectMaterials />
              <Footer />
            </>
          }
        />



      </Routes>
    </div>
  );
}

export default App;
