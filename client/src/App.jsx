import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Links from "./Pages/Links";

export default function App() {
 
  return (
      <>
      <Navbar />

      
      <Routes>
        <Route path="/" element={<Links />} />
        <Route path="/analytics" element={<h1 className="text-white p-6">Analytics Page</h1>} />
      </Routes>


    </>
  )
}