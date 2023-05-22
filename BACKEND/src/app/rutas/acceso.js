const conn = require("../../config/database");


var bodyParser = require('body-parser');



var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  app.get("/test", (req, res) => {
    res.status(200).json({prueba: "test"});
  });

  //insertar articulo
  app.post("/articulo", (req,res) => {
    // console.log((req.body.username));
    let consulta = `INSERT INTO articulos(nombre,descripcion,precio,categoria,img,detalle) VALUES ('${req.body.nombre}','${req.body.descripcion}',${req.body.precio},'${req.body.categoria}','${req.body.img}','${req.body.detalle}')`;
    console.log(consulta);
    let agregado = ``;

    conn.query(consulta, (err, rows, cols) => {
      if(err){
        res.status(500).json({status: 0, mensaje: "Error en base de datos"});
      }else {
        var ultimoID = rows.insertId;
        console.log(ultimoID);
        conn.end;

        if(req.body.categoria == "ukulele"){
          agregado = `INSERT INTO ukulele(articulo_id,color,modelo) VALUES ('${ultimoID}','${req.body.color}','${req.body.modelo}')`;
          console.log(agregado);
          conn.query(agregado, (err,rows,cols) => {
            if(err){
              res.status(500).json({status: 0, mensaje: "Error en base de datos"});
            }else {
              res.status(200).json({status:1, mensaje: "Inserción de ukulele satisfactorio"});
            }
          });
        }
        if(req.body.categoria == "avion"){
          agregado = `INSERT INTO aviones(articulo_id,color,modelo) VALUES ('${ultimoID}','${req.body.color}','${req.body.modelo}')`;
          console.log(agregado);
          conn.query(agregado, (err,rows,cols) => {
            if(err){
              res.status(500).json({status: 0, mensaje: "Error en base de datos"});
            }else {
              res.status(200).json({status:1, mensaje: "Inserción de avion satisfactorio"});
            }
          });
        }
        if(req.body.categoria === "rompecabezas_grande" || req.body.categoria == "rompecabezas_mediano" || req.body.categoria == "rompecabezas_small"){
          agregado = `INSERT INTO rompecabezas(articulo_id, size) VALUES ('${ultimoID}','${req.body.categoria}')`;
          console.log(agregado);
          conn.query(agregado, (err,rows,cols) => {
            if(err){
              res.status(500).json({status: 0, mensaje: "Error en base de datos"});
            }else {
              res.status(200).json({status: 1, mensaje: "Inserción de rompecabezas satisfactorio"});
              // var romCabUltimoID = rows.insertId;
              // console.log(romCabUltimoID);
              // conn.end;
            }
              // agregado = `INSERT INTO design_r(design_nombre,design_img) VALUES ('${req.body.design_nombre}','${req.body.design_img}')`;
              // console.log(agregado);
              // conn.query(agregado, (err,rows,cols) => {
              //   if(err){
              //     res.status(500).json({status: 0, mensaje: "Error al insertar design"});
              //   }else {
              //     var designUltimoID = rows.insertId;
              //     console.log(designUltimoID);
              //     conn.end;
              //     agregado = `INSERT INTO rompecabeza_design(rompecabezas_id,design_id,size) VALUES ('${romCabUltimoID}','${designUltimoID}','${req.body.size}')`;
              //     conn.query(agregado, (err,rows,cols) => {
              //       if(err){
              //         res.status(500).json({status: 0, mensaje: "Error en base de datos enlazando design"});
              //       }else {
              //         res.status(200).json({status:1, mensaje: "Inserción de rompecabezas satisfactorio"});
              //       }
              //     });
              //   }
              // });
            // }
          });
        }
        if(req.body.categoria == "cuadro_grande" || req.body.categoria == "cuadro_mediano" || req.body.categoria == "cuadro_small" || req.body.categoria == "cuadro_misc"){
          agregado = `INSERT INTO cuadros(articulo_id, size) VALUES ('${ultimoID}','${req.body.categoria}')`;
          console.log(agregado);
          conn.query(agregado, (err,rows,cols) => {
            if(err){
              res.status(500).json({status: 0, mensaje: "Error en base de datos"});
            }else {
              res.status(200).json({status: 1, mensaje: "Inserción de cuadro satisfactorio"});
              // var cuadroUltimoID = rows.insertId;
              // console.log(cuadroUltimoID);
              // conn.end;
            }
            //   agregado = `INSERT INTO design_c(design_nombre,design_img) VALUES ('${req.body.design_nombre}','${req.body.design_img}')`;
            //   console.log(agregado);
            //   conn.query(agregado, (err,rows,cols) => {
            //     if(err){
            //       res.status(500).json({status: 0, mensaje: "Error al insertar design"});
            //     }else {
            //       var designUltimoID = rows.insertId;
            //       console.log(designUltimoID);
            //       conn.end;
            //       agregado = `INSERT INTO cuadro_design(cuadro_id,design_id,size) VALUES ('${cuadroUltimoID}','${designUltimoID}','${req.body.size}')`;
            //       conn.query(agregado, (err,rows,cols) => {
            //         if(err){
            //           res.status(500).json({status: 0, mensaje: "Error en base de datos enlazando design"});
            //         }else {
            //           res.status(200).json({status:1, mensaje: "Inserción de cuadro satisfactorio"});
            //         }
            //       });
            //     }
            //   });
            // }
          });
        }

      }
    });
  });


  //obtener todos los articulos
  app.get("/articulos", ( req, res) => {

    let consulta = `SELECT ar.*,(SELECT SUM(ua.cantidad) FROM ubicacion_articulo ua WHERE ar.aid=ua.articulo_id) as cantidad FROM articulos ar LEFT JOIN aviones av ON av.articulo_id = ar.aid LEFT JOIN ukulele uk ON uk.articulo_id = ar.aid LEFT JOIN rompecabezas r on ar.aid = r.articulo_id LEFT JOIN cuadros c on ar.aid = c.articulo_id`;
    conn.query(consulta, (err, rows, cols)=>{
      if(err){
        res.status(400).json({status:0,mensaje:"Error en consulta, no hay informacion disponible"});
      }else {
        if(rows.length > 0){
          res.json({status:1, articulos:rows})
        } else {
          res.status(204).json({status:0, mensaje: "No se encontro articulo"});
        }

      }
    });

  });


  //obtener articulo por id
  app.get("/articulo", ( req, res) => {

    let aid = req.query.id;
    console.log("trying to get item..."+aid);
    let consulta = `SELECT * FROM articulos ar LEFT JOIN aviones av ON av.articulo_id = ar.aid LEFT JOIN ukulele uk ON uk.articulo_id = ar.aid LEFT JOIN rompecabezas r on ar.aid = r.articulo_id LEFT JOIN cuadros c on ar.aid = c.articulo_id WHERE ar.aid = ${aid}`;

    conn.query(consulta, (err, rows, cols)=>{
      if(err){
        res.status(400).json({status:0,mensaje:"Error en consulta, no hay informacion disponible"});
      }else {
        if(rows.length > 0){
          res.json({status:1, articulos:rows})
        } else {
          res.status(204).json({status:0, mensaje: "No se encontro estilo"});
        }

      }
    });

  });

  //obtener ubicaciones del articulo
  app.get("/articuloUbicacion", ( req, res) => {

    let aid = req.query.id;
    console.log("trying to get item..."+aid);
    let consulta = `SELECT u.nombre, ua.cantidad, ua.ubicacion_articulo FROM ubicaciones u LEFT JOIN ubicacion_articulo ua on u.ubicacion_id = ua.ubicacion_id LEFT JOIN articulos a on ua.articulo_id = a.aid WHERE a.aid = ${aid}`;

    conn.query(consulta, (err, rows, cols)=>{
      if(err){
        res.status(400).json({status:0,mensaje:"Error en consulta, no hay informacion disponible"});
      }else {
        if(rows.length > 0){
          res.json({status:1, articulosUbicacion:rows});
          console.log(rows);
        } else {
          res.status(204).json({status:0, mensaje: "No se encontro articulo en tienda"});
        }

      }
    });

  });

  //obtener articulos por ubicacion
  app.get("/ubicacionArticulo", ( req, res) => {

    let uid = req.query.id;
    console.log("trying to get store..."+uid);
    let consulta = `SELECT * FROM articulos ar LEFT JOIN aviones av ON av.articulo_id = ar.aid LEFT JOIN ukulele uk ON uk.articulo_id = ar.aid LEFT JOIN rompecabezas r on ar.aid = r.articulo_id LEFT JOIN cuadros c on ar.aid = c.articulo_id LEFT JOIN ubicacion_articulo ua on ua.articulo_id = ar.aid WHERE ua.ubicacion_id = ${uid}`;

    conn.query(consulta, (err, rows, cols)=>{
      if(err){
        res.status(400).json({status:0,mensaje:"Error en consulta, no hay informacion disponible"});
      }else {
        if(rows.length > 0){
          res.json({status:1, ubicacionArticulos:rows});
          console.log(rows);
        } else {
          res.status(204).json({status:0, mensaje: "No se encontro articulo en tienda"});
        }

      }
    });

  });
  //delete por articulo
  app.delete('/articulo', (req, res) => {

    let aid = req.query.id;
    let consulta = `DELETE ar.*,av.*,uk.*,r.*,c.*,ua.* FROM articulos ar LEFT JOIN aviones av ON av.articulo_id = ar.aid LEFT JOIN ukulele uk ON uk.articulo_id = ar.aid LEFT JOIN rompecabezas r on ar.aid = r.articulo_id LEFT JOIN cuadros c on ar.aid = c.articulo_id LEFT JOIN ubicacion_articulo ua on ar.aid = ua.articulo_id WHERE ar.aid = ${aid}`;
    console.log(consulta);
    conn.query(consulta, (err, rows) => {
      if (err){
        res.status(400).json({status: 0, mensaje: err});
      }else {
        res.json({status:1, mensaje: "exito al eliminar articulo"})
      }
    });

  });


  //actualizar por articulo
  app.put('/articulos', (req, res) => {

    let aid = req.query.id;
    console.log(aid)
    let consulta = `UPDATE articulos SET nombre = "${req.body.nombre}", categoria = "${req.body.categoria}", precio = ${req.body.precio}, descripcion = "${req.body.descripcion}", img = "${req.body.img}" WHERE aid = ${aid}`;
    console.log(consulta);
    conn.query(consulta, (err, rows) => {
      if (err){
        res.status(400).json({status: 0, mensaje: err});
      }else {
        conn.end;
        if(req.body.categoria == "ukulele"){
          agregado = `UPDATE ukulele SET color = "${req.body.color}", modelo = "${req.body.modelo}" WHERE articulo_id = ${aid}`;
          console.log(agregado);
          conn.query(agregado, (err,rows,cols) => {
            if(err){
              res.status(500).json({status: 0, mensaje: "Error en base de datos"});
            }else {
              res.status(200).json({status:1, mensaje: "Actualizacion de ukulele satisfactorio"});
            }
          });
        }
        if(req.body.categoria == "avion"){
          agregado = `UPDATE aviones SET color = "${req.body.color}", modelo = "${req.body.modelo}" , marca = "${req.body.marca}" WHERE articulo_id = ${aid}`;
          console.log(agregado);
          conn.query(agregado, (err,rows,cols) => {
            if(err){
              res.status(500).json({status: 0, mensaje: "Error en base de datos"});
            }else {
              res.status(200).json({status:1, mensaje: "Actualizacion de avion satisfactorio"});
            }
          });
        }
        if(req.body.categoria === "rompecabezas_grande" || req.body.categoria == "rompecabezas_mediano" || req.body.categoria == "rompecabezas_small"){
          agregado = `UPDATE rompecabezas SET size = "${req.body.categoria}" WHERE articulo_id = ${aid}`;
          console.log(agregado);
          conn.query(agregado, (err,rows,cols) => {
            if(err){
              res.status(500).json({status: 0, mensaje: "Error en base de datos"});
            }else {
              res.status(200).json({status: 1, mensaje: "Actualizacion de rompecabezas satisfactorio"});
              // var romCabUltimoID = rows.insertId;
              // console.log(romCabUltimoID);
              // conn.end;
            }
            // agregado = `INSERT INTO design_r(design_nombre,design_img) VALUES ('${req.body.design_nombre}','${req.body.design_img}')`;
            // console.log(agregado);
            // conn.query(agregado, (err,rows,cols) => {
            //   if(err){
            //     res.status(500).json({status: 0, mensaje: "Error al insertar design"});
            //   }else {
            //     var designUltimoID = rows.insertId;
            //     console.log(designUltimoID);
            //     conn.end;
            //     agregado = `INSERT INTO rompecabeza_design(rompecabezas_id,design_id,size) VALUES ('${romCabUltimoID}','${designUltimoID}','${req.body.size}')`;
            //     conn.query(agregado, (err,rows,cols) => {
            //       if(err){
            //         res.status(500).json({status: 0, mensaje: "Error en base de datos enlazando design"});
            //       }else {
            //         res.status(200).json({status:1, mensaje: "Inserción de rompecabezas satisfactorio"});
            //       }
            //     });
            //   }
            // });
            // }
          });
        }
        if(req.body.categoria == "cuadro_grande" || req.body.categoria == "cuadro_mediano" || req.body.categoria == "cuadro_small" || req.body.categoria == "cuadro_misc"){
          agregado = `UPDATE cuadros SET size = "${req.body.categoria}" WHERE articulo_id = ${aid}`;
          console.log(agregado);
          conn.query(agregado, (err,rows,cols) => {
            if(err){
              res.status(500).json({status: 0, mensaje: "Error en base de datos"});
            }else {
              res.status(200).json({status: 1, mensaje: "Actualizacion de cuadro satisfactorio"});
              // var cuadroUltimoID = rows.insertId;
              // console.log(cuadroUltimoID);
              // conn.end;
            }
            //   agregado = `INSERT INTO design_c(design_nombre,design_img) VALUES ('${req.body.design_nombre}','${req.body.design_img}')`;
            //   console.log(agregado);
            //   conn.query(agregado, (err,rows,cols) => {
            //     if(err){
            //       res.status(500).json({status: 0, mensaje: "Error al insertar design"});
            //     }else {
            //       var designUltimoID = rows.insertId;
            //       console.log(designUltimoID);
            //       conn.end;
            //       agregado = `INSERT INTO cuadro_design(cuadro_id,design_id,size) VALUES ('${cuadroUltimoID}','${designUltimoID}','${req.body.size}')`;
            //       conn.query(agregado, (err,rows,cols) => {
            //         if(err){
            //           res.status(500).json({status: 0, mensaje: "Error en base de datos enlazando design"});
            //         }else {
            //           res.status(200).json({status:1, mensaje: "Inserción de cuadro satisfactorio"});
            //         }
            //       });
            //     }
            //   });
            // }
          });
        }

      }
    });

  });



  //agregar sitio
  app.post("/ubicacion", (req,res) => {
    // console.log((req.body.username));
    let consulta = `INSERT INTO ubicaciones(nombre,direccion,detalle) VALUES ('${req.body.nombre}','${req.body.direccion}',${req.body.detalle})`;
    console.log(consulta);
    let agregado = ``;

    conn.query(consulta, (err, rows, cols) => {
      if(err){
        res.status(500).json({status: 0, mensaje: "Error en base de datos"});
      }else {
        res.status(200).json({status:1, mensaje: "Inserción de sitio satisfactorio"});
      }
    });
  });

  //agregar inventario a la ubicacion
  app.post("/ubicacionArticulo", (req,res) => {

    let uid = req.query.id;
    console.log(uid);
    let verify = `SELECT * FROM ubicacion_articulo WHERE ubicacion_id = ${uid} AND articulo_id = ${req.body.articulo_id}`;
    let consulta = `UPDATE ubicacion_articulo SET cantidad = (ubicacion_articulo.cantidad+${req.body.cantidad}) where (ubicacion_id = ${uid} AND articulo_id = ${req.body.articulo_id});`;
    console.log(consulta);
    let agregado = `INSERT INTO ubicacion_articulo(ubicacion_id,articulo_id,cantidad) VALUES (${uid},${req.body.articulo_id},${req.body.cantidad})`;

    conn.query(verify, (err, rows, cols) => {
      if(err){
        res.status(500).json({status: 0, mensaje: "Error en base de datos: agregar existente"});
      }else {
        console.log(rows.length);
        if(rows.length>0){
          conn.end;
          conn.query(consulta, (err, rows, cols) => {
            if(err){
              res.status(500).json({status: 0, mensaje: "Error en base de datos"});
            }else {
              res.status(200).json({status:1, mensaje: "Adicion de inventario satisfactorio"});
            }
          });
        }else{
          conn.end;
          conn.query(agregado, (err, rows, cols) => {
            if(err){
              res.status(500).json({status: 0, mensaje: "Error en base de datos"});
            }else {
              res.status(200).json({status:1, mensaje: "Adicion de nuevo inventario satisfactorio"});
            }
          });
        }
      }
    });
  });


  //obtener todos los sitios
  app.get("/ubicaciones", ( req, res) => {

    let consulta = `SELECT * FROM ubicaciones`;
    conn.query(consulta, (err, rows, cols)=>{
      if(err){
        res.status(400).json({status:0,mensaje:"Error en consulta, no hay informacion disponible"});
      }else {
        if(rows.length > 0){
          res.json({status:1, ubicaciones:rows})
        } else {
          res.status(204).json({status:0, mensaje: "No se encontro ubicacion"});
        }

      }
    });

  });

  app.delete('/ubicacion', (req, res) => {

    let uid = req.query.id;
    let consulta = `DELETE u.*,ua.*,ue.* FROM ubicaciones u LEFT JOIN ubicacion_articulo ua ON ua.ubicacion_id = u.ubicacion_id LEFT JOIN ubicacion_empleado ue ON ue.ubicacion_id = u.ubicacion_id WHERE u.ubicacion_id = ${uid}`;
    console.log(consulta);
    conn.query(consulta, (err, rows) => {
      if (err){
        res.status(400).json({status: 0, mensaje: err});
      }else {
        res.json({status:1, mensaje: "exito al eliminar ubicacion"})
      }
    });
});

  app.get("/empleadosUbicacion", ( req, res) => {

    let uid = req.query.id;
    let consulta = `SELECT * FROM ubicacion_empleado ue LEFT JOIN empleados e ON ue.dpi = e.dpi WHERE ue.ubicacion_id = ${uid}`;
    console.log(consulta);
    conn.query(consulta, (err, rows, cols) => {
      if (err) {
        res.status(400).json({status: 0, mensaje: "Error en consulta, no hay informacion disponible"});
      } else {
        if (rows.length > 0) {
          res.json({status: 1, empleadosUbicacion: rows})
        } else {

          res.status(204).json({status: 0, mensaje: "No se encontro ubicacion"});
        }

      }
    });
  });
  //agregar empleado
  app.post("/empleado", (req,res) => {
    // console.log((req.body.username));
    let consulta = `INSERT INTO empleados(dpi,nombres,apellidos,fecha_nacimiento,sueldo,detalle) VALUES ('${req.body.dpi}','${req.body.nombres}','${req.body.apellidos}','${req.body.fecha_nacimiento}',${req.body.sueldo},${req.body.detalle})`;
    console.log(consulta);
    let agregado = ``;

    conn.query(consulta, (err, rows, cols) => {
      if(err){
        res.status(500).json({status: 0, mensaje: "Error en base de datos"});
      }else {
        agregado = `INSERT INTO ubicacion_empleado(ubicacion_id,dpi) VALUES (${req.body.ubicacion},'${req.body.dpi}')`;
        conn.end;
        conn.query(agregado, (err, rows, cols) => {
          if(err){
            res.status(500).json({status: 0, mensaje: "Error en base de datos"});
          }else {
            res.status(200).json({status:1, mensaje: "Inserción de empleado satisfactorio"});
          }
        });

      }
    });
  });

  //actualizar empleado
  app.put("/empleado", (req,res) => {
    let dpi = req.query.id;

    let consulta = `UPDATE empleados SET dpi ='${req.body.dpi}', nombres ='${req.body.nombres}', apellidos ='${req.body.apellidos}',fecha_nacimiento ='${req.body.fecha_nacimiento}', sueldo =${req.body.sueldo} WHERE dpi = ${dpi}`;
    console.log(consulta);
    let agregado = ``;
    conn.query(consulta, (err, rows, cols) => {
      if(err){
        res.status(500).json({status: 0, mensaje: "Error en base de datos"});
      }else {
        agregado = `UPDATE ubicacion_empleado SET dpi ='${req.body.dpi}', ubicacion_id = ${req.body.ubicacion} WHERE dpi = ${dpi}`;
        console.log(agregado);
        conn.end;
        conn.query(agregado, (err, rows, cols) => {
          if(err){
            res.status(500).json({status: 0, mensaje: "Error en base de datos"});
          }else {
            console.log("actualizacion exitosa");
            res.status(200).json({status:1, mensaje: "Actualizacion de empleado satisfactorio"});
          }
        });
      }
    });
  });

  //listar empleados
  app.get("/empleados", ( req, res) => {

    let consulta = `SELECT * FROM empleados e LEFT JOIN ubicacion_empleado ue ON ue.dpi = e.dpi LEFT JOIN ubicaciones u ON u.ubicacion_id = ue.ubicacion_id`;
    conn.query(consulta, (err, rows, cols)=>{
      if(err){
        res.status(400).json({status:0,mensaje:"Error en consulta, no hay informacion disponible"});
      }else {
        if(rows.length > 0){
          res.json({status:1, empleados:rows})
        } else {
          res.status(204).json({status:0, mensaje: "No se encontro empleados"});
        }

      }
    });

  });

  //obtener empleado por dpi
  app.get("/empleado", ( req, res) => {

    let dpi = req.query.id;
    let consulta = `SELECT * FROM empleados e LEFT JOIN ubicacion_empleado ue ON ue.dpi = e.dpi WHERE e.dpi = ${dpi}`;
    conn.query(consulta, (err, rows, cols)=>{
      if(err){
        res.status(400).json({status:0,mensaje:"Error en consulta, no hay informacion disponible"});
      }else {
        if(rows.length > 0){
          res.json({status:1, empleado:rows})
        } else {
          res.status(204).json({status:0, mensaje: "No se encontro empleado"});
        }

      }
    });

  });

  //eliminar empleado
  app.delete('/empleado', (req, res) => {

    let dpi = req.query.id;
    let consulta = `DELETE e.*,ue.* FROM empleados e LEFT JOIN ubicacion_empleado ue ON ue.dpi = e.dpi WHERE e.dpi = ${dpi}`;
    console.log(consulta);
    conn.query(consulta, (err, rows) => {
      if (err){
        res.status(400).json({status: 0, mensaje: err});
      }else {
        res.json({status:1, mensaje: "exito al eliminar ubicacion"})
      }
    });
  });

}

