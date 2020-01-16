const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const favicon = require('serve-favicon')
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
// Require the Stripe library with a test secret key.
const stripe = require("stripe")(keySecret);
const bodyParser = require("body-parser");
const emoji = require('node-emoji')

//Socket.io mount
const app = express();
// const server = require('http').Server(app)
// const io = require('socket.io')(server)

require('dotenv').config();
require('./config/database')
require('./config/google')
require('./config/facebook')
require('./config/linkedin')
const port = process.env.LISTENING_PORT



const indexRoutes = require('./routes/index')
const groupsRoutes = require('./routes/groups')
const membersRoutes = require('./routes/members')
const groupAdminsRoutes = require('./routes/groupAdmins')
const adminsRoutes = require('./routes/admins')
const transactionsRoutes = require('./routes/transactions')

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(favicon("public/images/favicon.ico"));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(require('body-parser').urlencoded({
  extended: false
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Socket.io code
// const groups = { }

// app.get('/', (req, res) => {
//   res.render('index', { groups: groups })
// })

// app.post('/group', (req, res) => {
//   if (groups[req.body.group] != null) {
//     return res.redirect('/')
//   }
//   groups[req.body.group] = { users: {} }
//   res.redirect(req.body.group)
//   // Send message that new group was created
//   io.emit('group-created', req.body.group)
// })

// app.get('/:group', (req, res) => {
//   if (groups[req.params.group] == null) {
//     return res.redirect('/')
//   }
//   res.render('group', { groupName: req.params.group })
// })

//Socket.io handlers


app.use('/', indexRoutes);
app.use('/', groupsRoutes);
app.use('/', transactionsRoutes);
app.use('/', membersRoutes);
app.use('/', groupAdminsRoutes);
app.use('/', adminsRoutes);

app.listen(port, () =>
  console.log(`Server listening on port ${port}`));