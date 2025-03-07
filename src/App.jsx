import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Boton';
import List from './components/List';
import Add from './components/Add';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ResponsiveAppBar from './components/AppBar';
import Login from './components/Login';
import Home from './components/Main';
import Logout from './components/Logout';

function App() {
  console.log("App component is running");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("Autenticación ha cambiado, estado actual:", isAuthenticated);
    if (isAuthenticated) {
      getItems();
    }
  }, [isAuthenticated]);
  

  const getItems = async () => {
    try {
      const startTime = Date.now();
      const result = await fetch("http://localhost:5000/items/", { method: "GET" });
      const data = await result.json();
      const endTime = Date.now();
      console.log("Tiempo de respuesta del GET:", endTime - startTime, "ms");
      setItems(data.recordset);
    } catch (error) {
      console.error("Error al obtener items:", error);
    }
  };
  


  let [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const add = async (item) => {
    const result = await fetch("http://localhost:5000/items/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
    const newItem = await result.json();
    console.log(newItem);
    if (result.ok) {
      setItems([...items, newItem]);
    } else {
      console.error('Error adding item:', newItem);
    }
  };
  
  

  const del = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/items/${id}`, { method: "DELETE" });
      if (response.ok) {
        setItems(items.filter((item) => item.item_id !== id)); 
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  const login = async (user) => {
    const result = await fetch("http://localhost:5000/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    const data = await result.json();
    console.log(data);
    setIsAuthenticated(data.isLogin);
    console.log(data.isLogin) 
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <BrowserRouter>
      <ResponsiveAppBar isAuthenticated={isAuthenticated} logout={logout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />      
            <Route path="/agregar-item" element={<Add add={add}/>}/>
            <Route path="/lista-items" element={<List items={items} ondelete={del}/>}/>
            <Route path="/login" element={!isAuthenticated ? <Login login={login} /> : <Home />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    
      
      
    </div>
  );
}

export default App;
