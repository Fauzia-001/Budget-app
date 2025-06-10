const express = require('express')
const cors=require('cors');
const app= express()
const{readdirsync} = require('fs')
require('dotenv').config()

const PORT= process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())


//routes
//readdirsync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+route)))


const server= () => {
    db()
app.listen(PORT,()=>{
    console.log('listening to port:', PORT);
})
}

server()