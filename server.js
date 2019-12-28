const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');

const app = express();

require('dotenv').config();
const port = process.env.LISTENING_PORT

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', (req, res)=>{
  res.render('index');
});

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
});