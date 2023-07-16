var express = require("express");
var router = express.Router();

const expenseController = require("../controllers/expenseController");

router.get('/GetAll', expenseController.getAll);
router.post('/Create', expenseController.post);
router.get('/:id', expenseController.get);
router.put('/Update', expenseController.put);
router.delete('/Delete/:id', expenseController.delete);

module.exports = router;
