const {Router} = require('express')
const qbankController = require('../controllers/qbankControllers')
const router = Router()

// qbank
router.get('/add', qbankController.qbank_add_get)
router.get('/', qbankController.qbank_index)
router.post('/', qbankController.qbank_add_post)
router.get('/:id', qbankController.qbank_details)
router.delete('/:id', qbankController.qbank_delete)

module.exports = router;