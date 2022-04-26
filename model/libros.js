const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LibroSchema = new Schema({
    Nombre: {type: String},
    Autor: {type: String},
    Editorial: {type: String},
    Unidades: {type: Number},
    Isbn: {type: Number},
});

const Libro = mongoose.model('Libro', LibroSchema);
module.exports = Libro;