const express = require('express')
const router = express.Router();
const membersCtrl = require('../controllers/members');
const groupsCtrl = require('../controllers/groups')
const siteAdminCtrl = require('../controllers/admins');



router.get('/site-admin', membersCtrl.isLoggedIn, siteAdminCtrl.index);
// router.post('/tickets', ticketsCtrl.create);
// router.post('/flights/:id/tickets', ticketsCtrl.addTicket);
// router.delete('/flights/:id/tickets', ticketsCtrl.deleteOneTicket);



module.exports = router;