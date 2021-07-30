//qbank_index, qbank_details, qbank_add_get, qbank_add_post, qbank_delete
const Question = require('../models/question')

const qbank_index = (req, res) => {
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
}

const qbank_details = (req, res) => {
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
}

const qbank_add_get = (req, res) => {
  const menus = []
  const navMenus = [
    { link: '/qbank', icon: 'fas fa-chevron-circle-left', label: 'Kembali' },
  ]
  res.render('pages/qbank-add', { navTitle: 'Tambah Pertanyaan', menus, navMenus })
}

const qbank_add_post = (req, res) => {
  const question = new Question(req.body)

  question.save()
    .then((result) => {
      res.redirect('/qbank')
    })
    .catch((err) => {
      console.log(err)
    })
}

const qbank_delete = (req, res) => {
  const id = req.params.id

  Question.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/qbank' })
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  qbank_index,
  qbank_details,
  qbank_add_get,
  qbank_add_post,
  qbank_delete
}