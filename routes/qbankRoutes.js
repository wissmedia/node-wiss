const express = require('express')
const Question = require('../models/question')
const router = express.Router()

// qbank
router.get('/qbank', (req, res) => {
  const menus = []
  const navMenus = [
    { link: '/', icon: 'fas fa-home', label: 'Beranda' },
    { link: '/qbank/add', icon: 'fas fa-plus-circle', label: 'Tambah' },
  ]
  Question.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('pages/qbank', { navTitle: 'Bank Pertanyaan', menus, navMenus, questions: result })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/qbank', (req, res) => {
  console.log(req.body)
  const question = new Question(req.body)

  question.save()
    .then((result) => {
      res.redirect('/qbank')
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/qbank/add', (req, res) => {
  const menus = []
  const navMenus = []
  res.render('pages/qbank-add', { navTitle: 'Tambah Pertanyaan', menus, navMenus })
})

router.get('/qbank/:id', (req, res) => {
  const id = req.params.id
  const navMenus = [
    { link: '/qbank', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  Question.findById(id)
    .then((result) => {
      res.render('pages/qbank-details', { question: result, navTitle: 'Detail Pertanyaan', navMenus })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.delete('/qbank/:id', (req, res) => {
  const id = req.params.id

  Question.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/qbank' })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router;