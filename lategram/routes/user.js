const router = require('express').Router();

const {signup,login,show,deleteOne,deleteAll} = require('../controllers/user');

router.post('/signup/',signup);
router.post('/login/',login);
router.get('/',show);
router.delete('/', deleteAll);
router.delete('/:id', deleteOne);

module.exports = router;