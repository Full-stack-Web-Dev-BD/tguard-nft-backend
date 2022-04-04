const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const packageSchema = new Schema({
    packageName: {
        type: String,
        required: true
    },
    packagePricing: {
        monthPricing: {
            type: Number,
            required: true
        },
        yearPricing: {
            type: Number,
            required: true
        },
    },
    features: {
        stepsCount: {
            type: String,
            required: true
        },
        scenariosCount: {
            type: String,
            required: true
        },
        integrationsCount: {
            type: String,
            required: true
        }
    }

})

module.exports = packageModel = mongoose.model('packageModel', packageSchema);