import "./App.css";
import Form from "./Forms/Form";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5uc1rnlNowaJguQ9_JSydyp9rNfXoZwY",
  authDomain: "tuyendungct-92c11.firebaseapp.com",
  projectId: "tuyendungct-92c11",
  storageBucket: "tuyendungct-92c11.appspot.com",
  messagingSenderId: "759733197738",
  appId: "1:759733197738:web:eafa106a0d5288e5b7a9d3",
  measurementId: "G-DHQNPT17DK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form />
        {/* <Search /> */}
      </header>
    </div>
  );
}

export default App;
