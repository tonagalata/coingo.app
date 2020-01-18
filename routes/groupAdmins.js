const express = require('express')
const router = express.Router();
const membersCtrl = require('../controllers/members');
const groupsCtrl = require('../controllers/groups')
const groupAdminCtrl = require('../controllers/groupAdmins');



router.get('/admin/:id/', membersCtrl.isLoggedIn, groupAdminCtrl.index);
router.get('/admin/show', membersCtrl.isLoggedIn, groupAdminCtrl.show);
// router.post('/tickets', ticketsCtrl.create);
// router.post('/flights/:id/tickets', ticketsCtrl.addTicket);
// router.delete('/flights/:id/tickets', ticketsCtrl.deleteOneTicket);



module.exports = router;