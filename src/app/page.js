"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './frame/header.js';
import React, { useEffect, useState } from "react";
import GlassesInputForm from './components/form-input.js';
import GlassesTable from './components/table-glasses.js';


// import styles from "./page.module.css";
import db from "../../firebase/firebaseDB.js";
import { collection, getDocs } from "firebase/firestore";


const glassesCollection = collection(db, "glasses");

export default function Home() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <Header page={page} setPage={setPage} />
      <div className="container pt-4 col-md-6 align-items-center">
        <div>
          {page === "browse" && <GlassesTable />}
          {page === "donate" && <GlassesInputForm />}
          {page === "home"}
          {process.env.NEXT_PUBLIC_FIREBASE_API_KEY}
        </div>
      </div>
    </div>
  );
}
