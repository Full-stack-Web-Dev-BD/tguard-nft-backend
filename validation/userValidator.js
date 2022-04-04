const validator = require('validator')
const registervalidator = (info) => {

    const errors = {}
    if (!info.name) {
        errors.name = "Name requird"
    }
    if (!info.email) {
        errors.email = "Email requird"
    } else if (!validator.default.isEmail(info.email)) {
        errors.email = "Email Not Valid "
    }
    if (!info.password) {
        errors.password = "Password requird"
    } else if (info.password.length < 6) {
        errors.password = "Password Length should be gatter then 6 Charecter"
    }
    if (!info.confirmPassword) {
        errors.confirmPassword = "Confirm Password requird"
    } else if (info.confirmPassword !== info.password) {
        errors.confirmPassword = "Both Password Are Different"
    }
    return {
        errors: errors,
        isValid: Object.keys(errors).length === 0
    }
}




const loginValidator = (info) => {

    let errors = {}
    if (!info.email) {
        errors.email = "Email requird"
    } else if (!validator.default.isEmail(info.email)) {
        errors.email = "Email Not Valid "
    }
    if (!info.password) {
        errors.password = "Password requird"
    }
    return {
        errors: errors,
        isValid: Object.keys(errors).length === 0
    }
}

module.exports = {
    registervalidator,
    loginValidator
}