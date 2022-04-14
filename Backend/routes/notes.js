const express = require('express')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note') // --> a model created from schema | to store data


// Route-1 Get all the notes:GET "api/notes/fetchallnotes" Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        res.send(error)
    }
})

// Route-2 Add a Note : POST "api/notes/addnote" Login Required
router.post('/addnote', fetchuser, [
    body('title', 'Title must be of atleast  2 characters').isLength({ min: 2 }),
    body('description', 'Decription must be atleast 5 characters').isLength({ min: 2 }),
    body('tag', 'TAg must be atlteast 2 character').isLength({ min: 2 })
], async (req, res) => {
    try {

        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save()
        res.json(saveNotes)
    } catch (error) {
        res.send(error)
    }
})
// Route-3 Update an existing Note : PUT "api/notes/updatenote" Login Required
router.put('/updatenote/:id', fetchuser,  async (req, res) => {
    try {

        const { title, description, tag } = req.body
        const newNote = {}
        if (title){newNote.title = title}
        if (description){newNote.description = description}
        if (tag){newNote.tag = tag}

        // Find the note to be uodated and update it
        let note = await  Note.findById(req.params.id)
        if(!note){
            res.status(404).send("Not Found");
        }
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Not Allowed");            
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json(note)
    } catch (error) {
        res.send(error)
    }
})

// Route-4 Delete a  Note : DELETE "api/notes/deletenote" Login Required
router.delete('/deletenote/:id', fetchuser,  async (req, res) => {
    try {

        const { title, description, tag } = req.body

        // Find the note to be delete and delete it
        let note = await  Note.findById(req.params.id)
        if(!note){
            res.status(404).send("Not Found");
        }
        // Allow delettion only if user is real or owns it
        if(note.user.toString() !== req.user.id){
            res.status(401).send("Not Allowed");            
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note deleted successfully",note:note})
    } catch (error) {
        res.send(error)
    }
})




module.exports = router