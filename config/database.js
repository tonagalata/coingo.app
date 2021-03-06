const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/coingo',
{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

// Database connection event
db.on('connected', ()=>{
  console.log(`Mongoose connected to:${db.host}:${db.port}`)
})