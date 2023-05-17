const { Router } = require('express');
const router = Router();

const Auth = require('../controller/auth');
const Group = require('../controller/group');
// auth
router.post('/singin', Auth.singin);
router.post('/singup', Auth.singup);

// create new group
router.post('/group/create', Group.create);
// get user admin groups
router.get('/group/my/:uid', Group.myGet);
// get where user is participants in groups
router.get('/group/all/:uid', Group.get);
// get group
router.get('/group/:gid', Group.getGroup);
// add new user for participants
router.post('/group/add/user', Group.addUser);
router.post('/group/remove/user', Group.RemoveUser);


router.get('/group/seorch/:title', Group.Seorch)


module.exports = router;