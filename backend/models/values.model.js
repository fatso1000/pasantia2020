const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const valueSchema = new Schema({
    temperatura: { type: Number, required: true },
    humedad: { type: Number, required: true},
    tilt: { type: String, required: true },
}, {
    timestamps: true,
});

const Value = mongoose.model('Value', valueSchema);

module.exports = Value;