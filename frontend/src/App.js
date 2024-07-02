import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";


import AdminPanel from './pages/AdminPanel'; // Uvozimo AdminPanel umjesto Home

import HeaderAdmin from "./components/HeaderAdmin";
import ProfileAdmin from "./pages/ProfileAdmin";
import AdminMaterials from "./components/AdminMaterials";
import AddMaterial from "./components/AddMaterial";
import EditMaterials from "./components/EditMaterials";
import ManageUsers from "./components/ManageUsers";
import StudentList from "./components/StudentList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
           <>
            <HeaderAdmin />
           <  AdminPanel />
           <Footer />
           </>
          
        }
           />
        <Route path="/admin" element={    <>
            <HeaderAdmin />
           <  AdminPanel />
           <Footer />
           </>
          
        }/>
        
       
        <Route
          path="/admin-profile"
          element={
            <>
              <HeaderAdmin />
              <ProfileAdmin/>
              <Footer />
            </>
          }
        />
        
   
       <Route
        path="/admin/materials"
        element={
          <>
             <HeaderAdmin />
            <AdminMaterials />
            <Footer />
          </>
        }
      />
       <Route
        path="/admin/add-material"
        element={
          <>
             <HeaderAdmin />
            <AddMaterial/>
            <Footer />
          </>
        }
      />
       <Route
        path="/admin/edit-materials/:subjectId"
        element={
          <>
             <HeaderAdmin />
            <EditMaterials/>
            <Footer />
          </>
        }
      />
     
         <Route
        path="/admin/manage-users"
        element={
          <>
             <HeaderAdmin />
            <ManageUsers/>
            <Footer />
          </>
        }
      />
        <Route
          path="/admin/subjects/:subjectId/students"
          element={
            <>
              <HeaderAdmin />
              <StudentList />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
