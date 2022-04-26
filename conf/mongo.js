function connMongo() {
    var mongoose = require('mongoose');
    var mongoDB = 'mongodb+srv://Jorge:Jorge01@cluster0.tbdkk.mongodb.net/R1-Datos?retryWrites=true&w=majority';
    mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error de Conexion a MongoDB'));
}

module.exports = connMongo
