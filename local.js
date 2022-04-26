const mongoose = require('mongoose')

const mongo = mongoose.connect('mongodb://localhost:27017/R1-APPWEB',{
    useNewUrlParser: true
})

    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongo