const User = require('../model/user')

module.exports = (req, res, next) => {
    console.log('Verificando');
    User.findById(req.session.usuario, (error, user) =>{
        if(error || !user)
        return res.redirec('/')
        next()
    })
}