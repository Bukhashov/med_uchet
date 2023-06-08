const { Router } = require('express');
const router = Router();

const path = require('path');

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
router.get('/group/all', Group.getAllGruops);
// get group
router.get('/group/:gid', Group.getGroup);

// add new user for participants
router.get('/group/:gid/todo', Group.getTodo);
router.post('/group/add/user', Group.addUser);

router.post('/group/remove/user', Group.RemoveUser);
// todo

router.get('/group/file/:gid/:tid/', Group.getTodoFile)
router.post('/group/:gid/add/todo', Group.addTodo);
router.post('/group/:gid/add/report', Group.reportAdd);
router.get('/group/:gid/:title/report', Group.getReport);

router.post('/group/del/todo', Group.deleteTodo);

router.get('/group/seorch/:title', Group.Seorch);


module.exports = router;