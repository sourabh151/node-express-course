const express = require('express');

const router = express.Router();

const {
    getPeople,
    postPeople,
    postPostmanPeople,
    putPeople,
    deletePeople,
} = require('../collections/people.js');


router.get('/',getPeople);

router.post('/',postPeople);

router.post('/postman',postPostmanPeople);

//put method
router.put('/:id',putPeople);

router.delete('/:id',deletePeople);





module.exports = router;
