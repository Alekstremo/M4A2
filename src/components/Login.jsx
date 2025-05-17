import { TextField, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Los campos no deben estar vacíos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.isLogin) {
        localStorage.setItem("token", data.token);
        alert("Login exitoso");
        navigate("/items");
      } else {
        alert("Error de login: " + (data.message || "Verifica tus credenciales"));
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar al servidor");
    }
  };

  return (
    <Box component="form" onSubmit={onsubmit}>
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained">Login</Button>
    </Box>
  );
};

export default Login;
