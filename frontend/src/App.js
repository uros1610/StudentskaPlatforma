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
import Materials from "./pages/Materials";
import SubjectMaterials from "./components/SubjectMaterials";
import InsertResultsOneSubject from "./components/InsertResultsOneSubject";
import ResultsTest from "./components/ResultsTest";
import AddMaterial from "./components/AddMaterial";
import EditMaterials from "./components/EditMaterials";
import Kalendar from "./pages/Kalendar";
import AdminPanel from "./components/AdminPanel";
import Chat from "./pages/Chat";

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
          path = "/results"
          element = {
            <>
            <Header />
            <ResultsTest/>
            <Footer />
          </>
          }
          />


       

        <Route path = "/edit-materials/:imePredmeta/:imeSmjera/:imeFakulteta"
          element = {
            <>
            <Header/>
            <EditMaterials/>
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

      <Route
          path="/calendar"
          element={
            <>
              <Header />
              <Kalendar />
              <Footer />
            </>
          }
        />

      <Route
        path = '/admin-panel'
        element = {
          <>
          <Header/>
          <AdminPanel/>
          <Footer/>
          </>
        }

      />

      <Route
          path="/chat"
          element={
            <>
              <Header />
              <Chat />
              <Footer />
            </>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
