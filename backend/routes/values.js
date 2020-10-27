const router = require('express').Router();
let Value = require('../models/values.model');

// Muestra todos los valores
router.route('/').get((req, res) => {
    Value.find().sort({createdAt: -1}) // Busca el ultimo resultado para createdAt, osea el ultimo campo subido
        .then(values => res.json(values))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const temperatura = req.body.temperatura;
    const humedad = req.body.humedad;
    const tilt = req.body.tilt;

    const newValues = new Value({
        temperatura,
        humedad,
        tilt,
    });

    newValues.save()
        .then(() => res.json('Values added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;