const Note = require('../models/note.model.js')

exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Note content can not be emptpy',
    })
  }

  const notes = new Note({
    title: req.body.title || 'Untitled Note',
    content: req.body.content,
  })

  notes
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while creating a Note',
      })
    })
}

exports.findAll = (req, res) => {
  Note.find()
    .then((notes) => {
      res.send(notes)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error required while retrieving notes',
      })
    })
}

exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then((note) => {
      if (!note) {
        res.status(404).send({
          message: ' Not found with id ' + req.params.noteId,
        })
      }
      res.send(note)
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(404).send({
          message: ' Not found with id ' + req.params.noteId,
        })
      }
      return res.status(500).send({
        message: 'error retrieving note with id ' + req.params.noteId,
      })
    })
}

exports.update = (req, res) => {
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || 'Untitled Note',
      content: req.body.content,
    },
    { new: true, useFindAndModify: false }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId,
        })
      }
      res.send(note)
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId,
        })
      }
      res.status(500).send({
        message: 'Error updating note with Id ' + req.params.noteId,
      })
    })
}

exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: 'Note not found with id ' + req.params.noteId,
        })
      }
      res.send({
        message: 'Note deleted successfully',
      })
    })
    .catch((err) => {
      if (err.kind === 'Object Id' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Note not found with Id ' + req.params.noteId,
        })
      }
    })
}
