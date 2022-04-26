var express = require('express');
var router = express.Router();
const libroCon = require('../controller/libroController')
const userCon = require('../controller/userController')
const Libro = require('../model/libros')
const User = require('../model/user')
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authentication')

/* GET home page. */
router.get("/home", (req, res) => {
  Libro.find({},(err, result) => {
    if (err) {
      console.log("A ocurrido un error " + err.message);
    }else{
          res.render("libros", {libros: result});
        }
      })
    });
router.get('/crearlibro', libroCon.getcreate);
router.post('/crarlibro', libroCon.postcreate);
router.get('/delete/:id', libroCon.getdelete);
router.post('/delete/:id', libroCon.delete);
router.get('/update/:id', libroCon.getUpdate);
router.post('/update/:id', libroCon.postUpdate);
router.get("/cerrar",(req, res)=>{
  req.session.destroy();
  res.redirect("/");
});
router.get("/",(req, res)=>{
  res.render("login",{data:null});
});

router.get("/index",(req, res)=>{
          res.render("index");
});

router.get("/registrar",(req, res)=>{
  res.render("registre");
});

router.post("/crearUser",(req, res)=>{
  const data = req.body;
  const user = new User({
      Usuario:data.Usuario,
      Email:data.Email,
      Password:data.Password,
  });
  user.save((err, result)=>{
      if (err) {
          console.log("A ocurriod un error ",err.message);
      } else {
          res.redirect("/");
      }
  });
});

router.post("/verificaruser",(req, res)=> {
  let usuario = req.body.usuario;
  let pass = req.body.password;

  console.log('Usuario: ' + usuario + " Pass: " + pass);

  if (usuario && pass) {

    User.findOne({ Usuario: usuario }, (error, user) => {
          if (user) {
              bcrypt.compare(pass, user.Password, (error, same) => {
                  if (same) { //Coinciden
                      //Almacena datos a sesión
                    req.session.usuario = usuario;
                      res.render('index',{user: req.session.usuario});

                  } else {
                      let data = {
                          message: 'Usuario o contraseña incorrecto',
                      }
                      res.render('login', {data:'Usuario o contraseña incorrecto'});
                  }
              })
          } else {
              let data = {
                  message: 'Usuario No Existe',
              }
              res.render('login', {data:'Usuario No Existe'});
          }
      })

  } else {
      let data = {
          message: 'Usuario o Contraseña Incorrecto',
      }
      res.render('login', data);
  }
});




module.exports = router;
