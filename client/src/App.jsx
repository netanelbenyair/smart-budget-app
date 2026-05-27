import "./App.css";
import { useState, useEffect ,useCallback} from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { BrowserRouter , Route,Routes } from "react-router-dom";

function App() {
  const [buckets, setBuckets] = useState([]);

  const fetchBuckets =useCallback( async () => {
    try {
      const response = await fetch("http://localhost:4000/api/buckets");
      if (!response.ok) throw new Error("בעיה בשרת");

      const data = await response.json();
      console.log(data);

      setBuckets(data);
    } catch (error) {
      console.error("error fetching buckets:", error);
    }
  },[]);
  useEffect(() => {
    const initFetch = async () => {
      await fetchBuckets(); 
    };
    initFetch();
  }, [fetchBuckets]);
  return (
    // הוספתי קצת סטיילינג לקונטיינר הראשי כדי שייראה טוב במרכז
    <div
      className="app-container"
      style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <BrowserRouter>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        המערכת הפיננסית שלי 💰
      </h1>
      <Navbar/>
      <Routes>
        <Route path="/" element ={ <HomePage buckets ={buckets} onExpenseAdded = {fetchBuckets}/>}/>
      </Routes>
        
      

      </BrowserRouter>
    </div>
  );
}

export default App;
