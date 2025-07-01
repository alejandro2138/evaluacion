import React, { useState, useEffect } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import ListaAlumnos from './components/ListaAlumnos';

function App() {
  // Estado para almacenar la lista de alumnos
  const [alumnos, setAlumnos] = useState([]);
  // Estado para controlar si estamos editando un alumno
  const [editando, setEditando] = useState(null);

  // Cargar datos del localStorage al iniciar la aplicación
  // useEffect se ejecuta solo una vez al montar el componente
  useEffect(() => {
    const datosGuardados = localStorage.getItem('alumnos');
    if (datosGuardados) {
      setAlumnos(JSON.parse(datosGuardados));
    }
  }, []);

  // Guardar datos en localStorage cada vez que cambie la lista de alumnos
  // useEffect se ejecuta cada vez que el array 'alumnos' cambie
  useEffect(() => {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
  }, [alumnos]);

  // Función para agregar un nuevo alumno
  const agregarAlumno = (nuevoAlumno) => {
    const alumnoConId = {
      ...nuevoAlumno,
      id: Date.now() // Usar timestamp como ID único
    };
    setAlumnos([...alumnos, alumnoConId]);
  };

  // Función para eliminar un alumno
  const eliminarAlumno = (id) => {
    setAlumnos(alumnos.filter(alumno => alumno.id !== id));
  };

  // Función para iniciar la edición de un alumno
  const iniciarEdicion = (alumno) => {
    setEditando(alumno);
  };

  // Función para actualizar un alumno
  const actualizarAlumno = (alumnoActualizado) => {
    setAlumnos(alumnos.map(alumno => 
      alumno.id === alumnoActualizado.id ? alumnoActualizado : alumno
    ));
    setEditando(null);
  };

  // Función para cancelar la edición
  const cancelarEdicion = () => {
    setEditando(null);
  };

  return (
    <div className="app">
      <div className="header-nature">
        <span className="emoji-pasto" role="img" aria-label="pasto">🌱</span>
        <svg className="svg-pasto" viewBox="0 0 500 50" preserveAspectRatio="none">
          <path d="M0,40 Q50,10 100,40 T200,40 T300,40 T400,40 T500,40 V50 H0 Z" fill="#a8e063" />
          <path d="M0,45 Q50,20 100,45 T200,45 T300,45 T400,45 T500,45 V50 H0 Z" fill="#56ab2f" />
        </svg>
      </div>
      <div className="container">
        <h1 className="titulo">Evaluación de Alumnos</h1>
        
        <Formulario 
          agregarAlumno={agregarAlumno}
          editando={editando}
          actualizarAlumno={actualizarAlumno}
          cancelarEdicion={cancelarEdicion}
        />
        
        <ListaAlumnos 
          alumnos={alumnos}
          eliminarAlumno={eliminarAlumno}
          iniciarEdicion={iniciarEdicion}
        />
      </div>
    </div>
  );
}

export default App; 