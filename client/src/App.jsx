import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Analytics from "./Pages/Analytics";
import Links from "./Pages/Links";

export default function App() {
 
  return (
      <>
      <Navbar />

      
      <Routes>
        <Route path="/" element={<Links />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>


    </>
  )
}