const express = require('express')
const app = express();
const db = require('./db/index')
const morgan = require('morgan')

db.connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('port', process.env.PORT || 4000);

//rutas
app.use(require('./rutas/index'))

app.listen(app.get('port'), () =>{
    
    console.log('Server on the port', app.get('port'))
})