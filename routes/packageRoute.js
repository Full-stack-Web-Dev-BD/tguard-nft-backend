const express = require('express');
const router = express.Router();
const packageModel = require('../models/packages')
const passport = require('passport');
const role = require('../config/role')

// This  route have access to create new plan  from  admin ( only admin can create  new plan)
router.post('/create-package', passport.authenticate('jwt', { session: false }), (req, res) => {

	if (req.user.user_role === role.ADMIN_ROLE) {
		if (
			req.body.packageName &&
			req.body.monthPricing &&
			req.body.yearPricing &&
			req.body.stepsCount &&
			req.body.scenariosCount &&
			req.body.integrationsCount
		) {
			packageModel.findOne({ packageName: req.body.packageName })
				.then((package) => {
					if (package) {
						return res.json({ message: 'Package already exists' })
					} else {
						new packageModel({
							packageName: req.body.packageName,
							packagePricing: {
								monthPricing: req.body.monthPricing,
								yearPricing: req.body.yearPricing,
							},
							features: {
								stepsCount: req.body.stepsCount,
								scenariosCount: req.body.scenariosCount,
								integrationsCount: req.body.integrationsCount
							}
						})
							.save()
							.then(docs => { res.json(docs) })
							.catch(err => { res.json(err) })
					}
				})
		} else {
			return res.status(400).json({ message: 'Package Name,Month Pricing , Year Pricing , Steps Count , Scenarios Count , Integrations Count are required !!' })
		}
	} else {
		return res.status(400).json({ message: 'You are not allowed to access this role' })
	}
})
//  this route will provide all available plan  to show  in frontend 
router.get('/get-packages', (req, res) => {
	packageModel.find()
		.then(docs => { res.json(docs) })
		.catch(err => { res.json(err) })
})
module.exports = router;
