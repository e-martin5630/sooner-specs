"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './frame/header.js';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GlassesInputForm from './components/form-input.js';
import GlassesTable from './components/table-glasses.js';


// import styles from "./page.module.css";
import db from "../../firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

const glassesCollection = collection(db, "glasses");

export default function Home() {

  return (
    <div>
      <Header />
      <div className="container pt-4 col-md-6 align-items-center">
        <GlassesInputForm />
      </div>
      <div >
        <GlassesTable />
      </div>
    </div>
  );
}
