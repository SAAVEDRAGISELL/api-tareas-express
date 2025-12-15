const express = require('express');
const app = express();
const rutas = require('./routes');


app.use(express.json());


app.use('/api/tareas', rutas);


const PORT = 3000;


app.listen(PORT, () => {
console.log('Servidor funcionando en puerto 3000');
});