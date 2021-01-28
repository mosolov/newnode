const mongoose = require('mongoose');

const db = 'mongodb://127.0.0.1:27017/newnode'

mongoose.connect(db, {useCreateIndex:true, useFindAndModify:false, useNewUrlParser:true, useUnifiedTopology:true})

module.exports = mongoose;