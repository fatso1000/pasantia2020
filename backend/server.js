const express = require('express');
const cors = require('cors'); // Permite aceptar solicitudes http fuera de este servidor
const mongoose = require('mongoose');

// VARIABLES DE PRODUCCION
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// MONGOOSE CONFIG
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
// Cuando la conexion sea exitosa muestra lo siguiente
connection.once('open', () => {
    console.log('MongoDB db connection established successfully');
});

// ROUTES
const valuesRouter = require('./routes/values');

app.use('/values', valuesRouter);

// Server initialization
app.listen(port, () => {
    console.log('Server running on: http://localhost:' + port);
});
