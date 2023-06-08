const modelGroup = require('../models/group');
const modelTodo = require('../models/todo');
const report = require('../models/report');
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

    reportAdd = async (req, res) => {
        const { gid } = req.params;
        const { file } = req.files;
        const { fullname, title } = req.body;

        let LastFullname = fullname[fullname.length-1];
        let LastTitle = title[title.length-1];

        new report({
            fullname: LastFullname,
            group_id: gid,
            title: LastTitle
        }).save();

        let file_dir = `${path.join(__dirname, '../../public/report')}/${gid}`;
        createDir(file_dir)
        
        file_dir += `/${LastFullname}`;
        createDir(file_dir)
                
        let type = file[file.length-1].name.split('.').pop();

        await file[file.length-1].mv(`${file_dir}/${LastTitle}.${type}`, function(err) {
            if(err) {
               console.log(`err: ${err}`);
            }
        })
        
        res.status(201).json({massage: "saved"});
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
        try{
            const { gid } = req.params;
            const { file } = req.files;
            const { title, subject } = req.body;

            let LastTitle = title[title.length-1];
            let LastSubject = subject[subject.length-1];

            let newTodoId;

            new modelTodo({
                group: gid,
                title: LastTitle,
                subject: LastSubject,
            }).save(async (err, result) => {                
                newTodoId = String(result._id);
            });

            let file_dir = `${path.join(__dirname, '../../public/pdf')}/${gid}`;
            
            createDir(file_dir)

            let type = file[file.length-1].name.split('.').pop();
            console.log(LastTitle);

            await file[file.length-1].mv(`${file_dir}/${LastTitle}.${type}`, function(err) {
                if(err) {
                   console.log(`err: ${err}`);
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

    getReport = async (req, res) => {
        const { gid, title } = req.params;  
        const reports = await report.find({ group_id: gid, title: title });
        res.status(200).json(reports);
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