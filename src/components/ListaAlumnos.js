import React from 'react';
import './ListaAlumnos.css';

const ListaAlumnos = ({ alumnos, eliminarAlumno, iniciarEdicion }) => {
  // Función para calcular la escala de apreciación según el promedio
  // Esta función implementa la lógica de evaluación según los rangos establecidos:
  // - 1.0-3.9: Deficiente (rojo)
  // - 4.0-5.5: Con mejora (amarillo) 
  // - 5.6-6.4: Buen trabajo (azul)
  // - 6.5-7.0: Destacado (verde)
  const calcularApreciacion = (promedio) => {
    if (promedio >= 1.0 && promedio <= 3.9) {
      return { texto: 'Deficiente', clase: 'deficiente' };
    } else if (promedio >= 4.0 && promedio <= 5.5) {
      return { texto: 'Con mejora', clase: 'con-mejora' };
    } else if (promedio >= 5.6 && promedio <= 6.4) {
      return { texto: 'Buen trabajo', clase: 'buen-trabajo' };
    } else if (promedio >= 6.5 && promedio <= 7.0) {
      return { texto: 'Destacado', clase: 'destacado' };
    } else {
      return { texto: 'Promedio inválido', clase: 'invalido' };
    }
  };

  // Función para confirmar eliminación
  const confirmarEliminacion = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`)) {
      eliminarAlumno(id);
    }
  };

  // Si no hay alumnos, mostrar mensaje
  if (alumnos.length === 0) {
    return (
      <div className="lista-container">
        <h2 className="lista-titulo">Lista de Alumnos</h2>
        <div className="mensaje-vacio">
          <p>No hay alumnos registrados.</p>
          <p>¡Agrega tu primer alumno usando el formulario de arriba!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lista-container">
      <h2 className="lista-titulo">
        Lista de Alumnos ({alumnos.length})
      </h2>
      
      <div className="alumnos-grid">
        {alumnos.map((alumno) => {
          const apreciacion = calcularApreciacion(alumno.promedio);
          
          return (
            <div key={alumno.id} className="alumno-card">
              <div className="alumno-header">
                <h3 className="alumno-nombre">{alumno.nombre}</h3>
                <div className="alumno-promedio">
                  <span className="promedio-numero">{alumno.promedio}</span>
                </div>
              </div>
              
              <div className="alumno-info">
                <p className="alumno-asignatura">
                  <strong>Asignatura:</strong> {alumno.asignatura}
                </p>
                
                <div className="alumno-apreciacion">
                  <span className={`apreciacion-badge ${apreciacion.clase}`}>
                    {apreciacion.texto}
                  </span>
                </div>
              </div>
              
              <div className="alumno-acciones">
                <button
                  onClick={() => iniciarEdicion(alumno)}
                  className="btn-accion btn-editar"
                  title="Editar alumno"
                >
                  ✏️ Editar
                </button>
                
                <button
                  onClick={() => confirmarEliminacion(alumno.id, alumno.nombre)}
                  className="btn-accion btn-eliminar"
                  title="Eliminar alumno"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Resumen de estadísticas */}
      <div className="estadisticas">
        <h3>Resumen de Evaluaciones</h3>
        <div className="estadisticas-grid">
          <div className="estadistica-item">
            <span className="estadistica-numero">
              {alumnos.filter(a => a.promedio >= 6.5).length}
            </span>
            <span className="estadistica-label">Destacados</span>
          </div>
          <div className="estadistica-item">
            <span className="estadistica-numero">
              {alumnos.filter(a => a.promedio >= 5.6 && a.promedio <= 6.4).length}
            </span>
            <span className="estadistica-label">Buen trabajo</span>
          </div>
          <div className="estadistica-item">
            <span className="estadistica-numero">
              {alumnos.filter(a => a.promedio >= 4.0 && a.promedio <= 5.5).length}
            </span>
            <span className="estadistica-label">Con mejora</span>
          </div>
          <div className="estadistica-item">
            <span className="estadistica-numero">
              {alumnos.filter(a => a.promedio >= 1.0 && a.promedio <= 3.9).length}
            </span>
            <span className="estadistica-label">Deficientes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaAlumnos; 