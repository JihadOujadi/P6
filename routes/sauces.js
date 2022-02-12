const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesControl = require('../controllers/sauces');

router.post('/', auth, multer, saucesControl.createSauce);
router.put('/:id', auth, multer, saucesControl.modifySauce);
router.delete('/:id', auth, saucesControl.deleteSauce);
router.get('/', auth, saucesControl.getAllSauce);
router.get('/:id', auth, saucesControl.getOneSauce);
router.post('/:id/like', auth, saucesControl.likeSauce);


module.exports = router;