"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './frame/header.js';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GlassesInputForm from './components/form-input.js';


// import styles from "./page.module.css";
import db from "../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const glassesCollection = collection(db, "glasses");

export default function Home() {
  const [glasses, setGlasses] = useState([]);

  useEffect(() => {
    const fetchGlasses = async () => {
      const glassesSnapshot = await getDocs(glassesCollection);
      const glassesList = glassesSnapshot.docs.map(doc => doc.data());
      setGlasses(glassesList);
    };

    fetchGlasses();
  }, []);

  return (
    // <div className="container col-md-6 align-items-center">
    //   {glasses.map((glass, index) => (
    //     <div key={index} >
    //       <h3>{glass.pouch_number}, {glass.frame_color}, {glass.power}</h3>          
    //     </div>
    //   ))}
    // </div>
    <div>
      <Header />
      <div className="container pt-4 col-md-6 align-items-center">
        <GlassesInputForm />
      </div>
    </div>
  );
}
