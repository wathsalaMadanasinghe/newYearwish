import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  onSnapshot,
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import Lottie from "react-lottie";
import animationData from "./celebration.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Firebase configuration
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "newyearwish-81320",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCj375goND4uaCOoEl5sXswyEWQMVWLqsk",
  authDomain: "newyearwish-81320.firebaseapp.com",
  databaseURL: "https://newyearwish-81320-default-rtdb.firebaseio.com",
  projectId: "newyearwish-81320",
  storageBucket: "newyearwish-81320.firebasestorage.app",
  messagingSenderId: "640025414235",
  appId: "1:640025414235:web:d36843f84dd44693820d7e",
  measurementId: "G-M3T75E4NV1",
};

// useEffect(() => {
//   const unsubscribe = onSnapshot(collection(db, "wishes"), (querySnapshot) => {
//     const names = querySnapshot.docs.map((doc) => doc.data().name);
//     setNamesList(names);
//   });

//   // Cleanup the listener when the component unmounts
//   return () => unsubscribe();
// }, []);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");

  const handleCreateWish = async () => {
    if (!name) {
      toast.error("Please enter a name!");
      return;
    }
    const newWish = `Dear ${name},\nWishing you a fantastic year filled with joy, laughter, and all the things you love!!!🎉`;
    setWish(newWish);

    try {
      await addDoc(collection(db, "wishes"), {
        name,
        wish: newWish,
        createdAt: new Date(),
      });
      toast.success("Wish saved successfully!");
    } catch (error) {
      toast.error("Failed to save the wish. Please try again.");
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="app">
      <ToastContainer />
      <h1 className="title">🎊 Send Your Wishes 🎊</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your friend's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-box"
        />
        <button onClick={handleCreateWish} className="wish-button">
          Create Wish
        </button>
      </div>
      {wish && (
        <div className="wish-animation-overlay">
          <div className="wish-display">
            <h2>Wish of 2025 from Wathsala</h2>
            <p>{wish}</p>
          </div>
          <div className="animation">
            <Lottie options={lottieOptions} height={400} width={400} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
