//alumnos
function obtenerDatos() {
    return new Promise( async (resolve, reject) => {
        let sql = `SELECT * FROM persona`;
        
        sql = await global.pgp.as.format(sql);
          
        global.dbp.any(sql).then((data) => {
            console.log(data)  
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

function agregarAlumno(datos) {
    return new Promise((resolve, reject) => {
        let sql = `select public.__alumnos_insertar($1,$2,$3,$4,$5,$6)`;
        sql = global.pgp.as.format(sql, [datos.nombres, datos.apellido_pat, datos.apellido_mat, datos.grado,datos.fecha,datos.foto]);
        global.dbp.result(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            return reject(err);
        });
    });
}

function obtenerAlumno(idPersona) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM persona WHERE nid_persona = $1`;
        sql = global.pgp.as.format(sql, [idPersona]);
        global.dbp.one(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            return reject(err);
        });
    });
}


//movimientos
function obtenerMovimiento(idPersona) {
    return new Promise((resolve, reject) => {
        let sql = `select id_movimiento,desc_detalle_cronograma,monto_final,estado from movimiento join detalle_cronograma
         on id_detalle_cronograma = _id_detalle_cronograma where _id_persona = $1`;
        sql = global.pgp.as.format(sql, [idPersona]);
        global.dbp.any(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            return reject(err);
        });
    });
}

function pagar_Pensiones(datos) {
    console.log(JSON.stringify(datos))    

    return new Promise((resolve, reject) => {
        let sql = `select public.__pagos_pagar_pensiones($1)`;
        sql = global.pgp.as.format(sql, [JSON.stringify(datos)]);
        global.dbp.result(sql).then(data => {
            
            return resolve(data);
        }).catch(err => {
            
            return reject(err);
        });
    });
}


//grados

function obtenerGrados() {
    return new Promise( async (resolve, reject) => {
        let sql = `SELECT * FROM grados`;
        
        sql = await global.pgp.as.format(sql);
          
        global.dbp.any(sql).then((data) => {
            console.log(data)  
            return resolve(data);
        }).catch((err) => {
            return reject(err);
        });
    });
}

//reportes

function obtenerReporte() {
    
    return new Promise((resolve, reject) => {
        
        let sql = `select persona.*, movimiento.*, documento_x_audi_movimiento.*, documento_new.* from
        persona JOIN movimiento ON persona.nid_persona = movimiento._id_persona
       JOIN documento_x_audi_movimiento ON documento_x_audi_movimiento._id_movimiento = movimiento.id_movimiento
       JOIN documento_new ON documento_new.id_documento = documento_x_audi_movimiento._id_documento`;
        sql = global.pgp.as.format(sql);
        global.dbp.any(sql).then(data => {
            return resolve(data);
        }).catch(err => {
            return reject(err);
        });
    });
}




module.exports = {
    obtenerDatos,
    agregarAlumno,
    obtenerAlumno,
    obtenerMovimiento,
    obtenerGrados,
    pagar_Pensiones,
    obtenerReporte
}