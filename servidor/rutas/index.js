const { Router } = require('express');
const router = Router();
const {obtenerDatos, agregarAlumno, obtenerMovimiento, obtenerGrados, obtenerAlumno, pagar_Pensiones, obtenerReporte} = require('../controlador/index');

router.get('/', (req,res) =>{
    res.send('Home')
})

//alumnos
router.get('/api/alumnos', async (req,res) =>{
    const filas = await obtenerDatos();
    return res.json(filas);
})

router.get('/api/alumnos/:id',async(req,res)=>{
    const alum = await obtenerAlumno(req.params.id);
    return res.json(alum);
})

router.post('/api/alumnos', async(req,res)=>{
    console.log(req.body);
    const nuevo = await agregarAlumno(req.body);

    return res.json(nuevo);
})

//movimientos
router.get('/api/movimientos/:id', async (req,res)=>{
    
    const movs = await obtenerMovimiento(req.params.id);
    return res.json(movs);
})

router.post('/api/movimientos', async (req,res)=>{
    
    const actualizado = await pagar_Pensiones(req.body);
    return res.json(actualizado);
    
})

//grados
router.get('/api/grados', async (req,res) =>{
    const filas = await obtenerGrados();
    return res.json(filas);
})

//reporte

router.get('/api/reporte', async(req,res)=>{
    const reporte = await obtenerReporte();
    return res.json(reporte);
})



module.exports = router;