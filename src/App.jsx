import React from "react";
import MainPage from "./pages/MainPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import CategoryDetailsPage from './pages/CategoryDetailsPage.jsx'
import NotFoundPage from "./pages/NotFoundPage.jsx"
const App = () => {
  return (
    <Routes>
    {/* MAIN HOME */}
    <Route path="/" element={<MainPage />} />

    {/* CATEGORY PAGE  */}
    <Route path='/category/:categoryId' element={<CategoryDetailsPage />} />
    
    {/* NOT FOUND PAGE*/}
    <Route path='*' element={<NotFoundPage />}/>
    </Routes>
  );
};

export default App;
