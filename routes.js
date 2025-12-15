const express = require('express');
const router = express.Router();
let tareas = require('./data');

// VER TODAS LAS TAREAS
router.get('/', (req, res) => {
  res.json(tareas);
});

// CREAR TAREA
router.post('/', (req, res) => {
  const { titulo, descripcion, completada } = req.body;

  if (!titulo || typeof completada !== 'boolean') {
    return res.status(400).json({ mensaje: 'Datos inválidos' });
  }

  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    descripcion: descripcion || '',
    completada
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// EDITAR TAREA
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = tareas.find(t => t.id === id);

  if (!tarea) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  const { titulo, descripcion, completada } = req.body;

  if (!titulo || typeof completada !== 'boolean') {
    return res.status(400).json({ mensaje: 'Datos inválidos' });
  }

  tarea.titulo = titulo;
  tarea.descripcion = descripcion || tarea.descripcion;
  tarea.completada = completada;

  res.json(tarea);
});

// BORRAR TAREA
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tareas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Tarea no encontrada' });
  }

  tareas.splice(index, 1);
  res.json({ mensaje: 'Tarea eliminada' });
});

module.exports = router;