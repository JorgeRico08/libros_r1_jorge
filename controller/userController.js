const User = require('../model/user')
const bcrypt = require('bcrypt');

exports.getlogin = function(req, res){
    res.render('login')
}

exports.user_login = function(req, res) {
    let usuario = req.body.username;
    let pass = req.body.password;

    console.log('Usuario: ' + usuario + " Pass: " + pass);
    
    if (usuario && pass) {
        User.find({'username': usuario, 'password':pass}, function(error, results){
            if (error) {
                res.render('login', data);                
            }

            if (results.length > 0) {
                req.session.usuario = usuario;
                res.redirect('/datos');
            } else {
                res.redirect('/');   
            }


        });

    } else {
        res.render('/');
    }


};

exports.user_login_verify = function(req, res) {
    let usuario = req.body.username;
    let pass = req.body.password;

    if (usuario && pass) {

        User.findOne({ username: usuario }, (error, user) => {
            if (user) {
                bcrypt.compare(pass, user.password, (error, same) => {
                    if (same) { //Coinciden
                        //Almacena datos a sesión
                        req.session.usuario = usuario;
                        res.redirect('/datos');

                    } else {
                        
                        res.redirect('/');
                    }
                })
            } else {
                
                res.redirect('/');
            }
        })

    } else {
        
        res.redirect('/');
    }
};

exports.getRegister = function(req, res){
    res.render('registro')
}
exports.postRegister = function(req, res){
    const data2 = req.body;
    const users = new User({
        Username: data2.Username,
        Email: data2.Email,
        Password: data2.Password
    });
    users.save((err, result) => {
      if (err) {
        console.log("A ocurrido un error " + err.message);
      } else {
        console.log("Datos insertados correctamente");
        console.log(result);
        res.redirect('/home');
      }
    });
  }