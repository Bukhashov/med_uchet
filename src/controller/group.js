const modelGroup = require('../models/group');
const modelTodo = require('../models/todo');

class Group {
    // post
    create = async (req, res) => {
        const { uid, title } = req.body;
        
        new modelGroup({
            title: title,
            admin: uid,
            participants: uid,
        }).save();

        res.status(201).json({massage: "crated"});
    }
    // 
    addUser = async (req, res) => {
        const {gid, uid} = req.body;

        const ControlGroup = await modelGroup.find({_id: gid, participants: uid });
        
        if(ControlGroup.length == 0) {
            const group = await modelGroup.findOne({_id: gid});
            let arr = group.participants.push(uid);
            group.updateOne({
                participants: arr
            });
            group.save();
            res.status(200).json(group);
        }else{
            res.status(400).json({massage: "bad req"});
        }
    }
    // GET
    myGet = async (req, res) => {
        const { uid } = req.params;
        const UGroup = await modelGroup.find({ admin: uid });
        res.status(200).json(UGroup);
    }
    // GET
    get = async (req, res) => {
        const { uid } = req.params;
        const allGroup = await modelGroup.find({ participants: uid });
        res.status(200).json(allGroup);
    }
    // GET GROUP
    getGroup = async (req, res) => {
        const { gid } = req.params;
        const group = await modelGroup.findById(gid);
        if(group) {
            // get todo es
            const todoes = await modelTodo.find({ group: gid });
            res.status(200).json(todoes);
        }else{
            res.status(400);
        }
    }

    RemoveUser = async (req, res) => {
        
    }

    addTodo = async (req, res) => {
        const { gid } = req.params;
        const { todo } = req.body;
        new modelTodo({
            group: gid,
            title: todo,
        }).save();

        res.status(200).json({ massage: "saved" });
    }
    getTodo = async (req, res) => {
        const { gid } = req.params;  
        const todos = await modelTodo.find({group: gid});
        res.status(200).json(todos);
    }
    deleteTodo = async (req, res) => {
        const { tid } = req.body;
        await modelTodo.findOneAndRemove({_id: tid});
        res.status(200).json({massage: "removed"});
    }

    Seorch = async (req, res) => {
        const {title} = req.params;

        const groups = await modelGroup.find({ title: title});
        res.status(200).json(groups);
    }
}

module.exports = new Group;