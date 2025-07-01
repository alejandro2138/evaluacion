import React, { useState, useEffect } from 'react';
import './Formulario.css';

const Formulario = ({ agregarAlumno, editando, actualizarAlumno, cancelarEdicion }) => {
  // Estado local para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    asignatura: '',
    promedio: ''
  });
  
  // Estado para manejar errores de validación
  const [errores, setErrores] = useState({});

  // Actualizar el formulario cuando se esté editando un alumno
  useEffect(() => {
    if (editando) {
      setFormData({
        nombre: editando.nombre,
        asignatura: editando.asignatura,
        promedio: editando.promedio.toString()
      });
    } else {
      // Limpiar formulario cuando no se está editando
      setFormData({
        nombre: '',
        asignatura: '',
        promedio: ''
      });
    }
    setErrores({});
  }, [editando]);

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo que se está editando
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ''
      });
    }
  };

  // Función para validar el formulario
  // Valida que todos los campos cumplan con los requisitos establecidos
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar nombre: debe tener al menos 2 caracteres
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar asignatura: campo obligatorio
    if (!formData.asignatura.trim()) {
      nuevosErrores.asignatura = 'La asignatura es obligatoria';
    }

    // Validar promedio: debe estar entre 1.0 y 7.0
    const promedio = parseFloat(formData.promedio);
    if (!formData.promedio) {
      nuevosErrores.promedio = 'El promedio es obligatorio';
    } else if (isNaN(promedio)) {
      nuevosErrores.promedio = 'El promedio debe ser un número válido';
    } else if (promedio < 1.0 || promedio > 7.0) {
      nuevosErrores.promedio = 'El promedio debe estar entre 1.0 y 7.0';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    const alumnoData = {
      nombre: formData.nombre.trim(),
      asignatura: formData.asignatura.trim(),
      promedio: parseFloat(formData.promedio)
    };

    if (editando) {
      // Actualizar alumno existente
      actualizarAlumno({
        ...alumnoData,
        id: editando.id
      });
    } else {
      // Agregar nuevo alumno
      agregarAlumno(alumnoData);
    }

    // Limpiar formulario
    setFormData({
      nombre: '',
      asignatura: '',
      promedio: ''
    });
  };

  return (
    <div className="formulario-container">
      <h2 className="formulario-titulo">
        {editando ? 'Editar Alumno' : 'Agregar Nuevo Alumno'}
      </h2>
      
      <form onSubmit={handleSubmit} className="formulario">
        <div className="form-grupo">
          <label htmlFor="nombre" className="form-label">
            Nombre del Alumno:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`form-input ${errores.nombre ? 'error' : ''}`}
            placeholder="Ingrese el nombre completo"
          />
          {errores.nombre && <span className="error-mensaje">{errores.nombre}</span>}
        </div>

        <div className="form-grupo">
          <label htmlFor="asignatura" className="form-label">
            Asignatura:
          </label>
          <input
            type="text"
            id="asignatura"
            name="asignatura"
            value={formData.asignatura}
            onChange={handleChange}
            className={`form-input ${errores.asignatura ? 'error' : ''}`}
            placeholder="Ingrese la asignatura"
          />
          {errores.asignatura && <span className="error-mensaje">{errores.asignatura}</span>}
        </div>

        <div className="form-grupo">
          <label htmlFor="promedio" className="form-label">
            Promedio (1.0 - 7.0):
          </label>
          <input
            type="number"
            id="promedio"
            name="promedio"
            value={formData.promedio}
            onChange={handleChange}
            className={`form-input ${errores.promedio ? 'error' : ''}`}
            placeholder="Ej: 6.5"
            step="0.1"
            min="1.0"
            max="7.0"
          />
          {errores.promedio && <span className="error-mensaje">{errores.promedio}</span>}
        </div>

        <div className="form-botones">
          <button type="submit" className="btn btn-primario">
            {editando ? 'Actualizar Alumno' : 'Agregar Alumno'}
          </button>
          
          {editando && (
            <button 
              type="button" 
              onClick={cancelarEdicion}
              className="btn btn-secundario"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Formulario; 