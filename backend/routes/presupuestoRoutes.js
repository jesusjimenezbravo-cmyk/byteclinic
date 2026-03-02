const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { crearPresupuesto } = require('../controllers/presupuestoController');

router.post('/',
[
  body('nombre').notEmpty(),
  body('email').isEmail(),
  body('telefono').isLength({ min: 9 }),
  body('servicios').isArray({ min: 1 })
],
(req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
},
crearPresupuesto
);

module.exports = router;