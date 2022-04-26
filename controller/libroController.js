const libro = require('../model/libros')

//libris

//Registro
exports.getcreate = function(req, res){
    res.render('crarLibro')
}
exports.postcreate = function(req, res){
  const data2 = req.body;
  const libros = new libro({
    Nombre: data2.Nombre,
    Autor: data2.Autor,
    Editorial: data2.Editorial,
    Unidades: data2.Unidades,
    Isbn: data2.Isbn,
  });
  libros.save((err, result) => {
    if (err) {
      console.log("A ocurrido un error " + err.message);
    } else {
      console.log("Datos insertados correctamente");
      console.log(result);
      res.redirect('/libros');
    }
  });
}

//Actualizar
exports.getUpdate = function(req, res){
    const param = req.params.id;
     libro.find({_id:param}, (err, result)=>{  
         if (err) {
            console.log('Ah ocurrido un error');
            console.log(err.message);
         } else {
             console.log(result);
         res.render('actu',{datos:result});
         }
     })
 }

 exports.postUpdate = function(req, res){
    const param = req.params.id;
 const data = req.body;
 libro.findOneAndUpdate({_id:param},data, (err, result)=>{
     if (err) {
         console.log('A ocurrido un error al actualizar')
         console.log(err.message)
     } else {
         console.log('Datos acutailizados correctamente');
         res.redirect('/libros')
     }
 })
}

 
//Borrar
exports.getdelete = function(req, res){
   const param = req.params.id;
    libro.find({_id:param}, (err, result)=>{  
        if (err) {
           console.log('Ah ocurrido un error');
           console.log(err.message);
        } else {
            console.log(result);
        res.render('borrar_libro',{datos:result});
        }
    })
}

exports.delete = function(req, res){
    const param = req.params.id;
    libro.deleteOne({_id:param}, (err, result)=>{
        if (err) {
            console.log('A ocurrido un error al eliminar')
            console.log(err.message)
        } else {
            console.log('Dato eliminado correctamente');
            res.redirect('/libros')
        }
    })
}