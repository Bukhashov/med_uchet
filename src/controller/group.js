const modelGroup = require('../models/group');
const modelTodo = require('../models/todo');
const path = require('path');
const fs = require("fs");

const createDir = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

class Group {
    // post
    create = async (req, res) => {
        const { uid, title, subject } = req.body;
        
        new modelGroup({
            title: title,
            admin: uid,
            participants: uid,
            subject: subject
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

    addReport = async (req, res) => {
        const { gid } = req.params;
        const { file } = req.files;
        const { title, subject, todo_id, uid } = req.body;
    
    }

    addTodo = async (req, res) => {
        try{
            const { gid } = req.params;
            const { file } = req.files;
            const { title, subject, todo_id } = req.body;

            let newTodoId;

            new modelTodo({
                group: gid,
                title: title,
                subject: subject,
            }).save((err, result) => {
                console.log(err);
                newTodoId = String(result._id);
            });

            let file_dir = `${path.join(__dirname, '../../public/pdf')}/${gid}`;
            
            createDir(file_dir)

            const type = file.name.split('.').pop();
            await file.mv(`${file_dir}/${todo_id}.${type}`, function(err) {
                if(err) {
                   console.log(err);
                }
            })
            
            res.status(201).json({massage: "saved"});

        }
        catch(e){
            console.log(`err server: ${e}`)
            return res.status(500).json({message: "Upload error"})
        }
    }
    getTodo = async (req, res) => {
        const { gid } = req.params;  
        const todos = await modelTodo.find({group: gid});
        res.status(200).json(todos);
    }
    getTodoFile = async (req, res) => {
        const {gid, tid} = req.params;
        res.download(`${path.join(__dirname, '../../public/pdf')}/${gid}/${tid}.pdf`);
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

    getAllGruops = async (req, res) => {
        const allGroups = await modelGroup.find({});
        res.status(200).json(allGroups);
    }
}

module.exports = new Group;