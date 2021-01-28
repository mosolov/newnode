const express = require('express');
require('./db/mongoose')
const app = express();
const userRouter = require('./routers/userRouter')
app.use(express.json())
app.use(userRouter)
const port = 3000 || process.env.PORT

app.listen(port, ()=>{
    console.log('Server running on port ' + port )
})
