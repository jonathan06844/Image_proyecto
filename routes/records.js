const express = require('express');
const router = express.Router();
const Record = require('../models/record');

// Crear un nuevo registro
router.post('/', async (req, res) => {
  const record = new Record(req.body);
  try {
    await record.save();
    res.status(201).send(record);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Consultar todos los registros
router.get('/', async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Consultar un registro por ID
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).send('Registro no encontrado');
    res.status(200).send(record);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Modificar un registro por ID
router.put('/:id', async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!record) return res.status(404).send('Registro no encontrado');
    res.status(200).send(record);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un registro por ID
router.delete('/:id', async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).send('Registro no encontrado');
    res.status(200).send('Registro eliminado');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;