const express=require('express');
const router=express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// route 1 get all the notes 
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes= await Notes.find({user:req.user.id})
        res.json(notes);
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");   
    }
})
// route 2 this for add notes
router.post('/addnotes',fetchuser,[
    body('description', 'description must be at least 5 characters long').isLength({ min: 5 }),
    body('title', 'title must be at least 3 characters long').isLength({ min: 3 }),
],async(req,res)=>{
    try {
    const {title,description,tag}=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
const note=new Notes({
    title,description,tag,user:req.user.id
})
const savednotes=await note.save()
res.json(savednotes)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");    
}
  })
//   Route 3 for update the notes 
router.put('/update/:id',fetchuser,async(req,res)=>{
    try {
        
    
    const {title,description,tag}=req.body;
    // create a newnote object
    const newnote={}
    if(title){newnote.title=title};
    if(description){newnote.description=description};
    if(tag){newnote.tag=tag;}
    // find the note that to be updated
let note = await Notes.findById(req.params.id)
if(!note){return res.status(404).send("not found")}
if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
}
 note= await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
res.json({note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");   
}
})
// route 4 for delete the existing note login required
router.delete('/delete/:id',fetchuser,async(req,res)=>{

    // find the note that to be updated
    try {
        
    
let note = await Notes.findById(req.params.id)
if(!note){return res.status(404).send("not found")}
if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
}
 note= await Notes.findByIdAndDelete(req.params.id)
res.json({"success":"deletes successfully",note:note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");  
}
})

module.exports=router