import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
    return (
      <div>
        <center>
        <h1>Hola, Alejandro</h1>
        <Link to="/add">Añadir</Link>
        <Link to="/items">Articulos</Link>
        </center>
      </div>
    );
  };

  export default Main;