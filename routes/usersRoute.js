const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const multer = require('multer');
const keys = require('../config/keys');
const userValidator = require('../validation/userValidator')
const userModel = require('../models/UserModel');
const UserModel = require('../models/UserModel');
const router = express.Router();
const role = require('../config/role')
 
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/users')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname)
	}
})

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
})

router.post('/uploadPhoto/:id', upload.single('photo'), (req, res) => {
	userModel.findByIdAndUpdate({ _id: req.params.id }, { photo: req.file.path }).then(data => {
		res.json(data)
	}).catch(err => {
		res.json(err)
	})
})


router.post('/register', (req, res) => {
	const { errors, isValid } = userValidator.registervalidator(req.body);


	if (!isValid) {
		return res.status(400).json(errors);
	}
	userModel.findOne({ email: req.body.email })
		.then((user) => {
			if (user) {
				errors.email = 'Email already exits';
				res.status(400).json(errors);
			} else {
				userModel.find()
					.then((users) => {
						const newUser = new userModel({
							name: req.body.name,
							email: req.body.email,
							//photo:req.file.path,
							role:req.body.role,
							password: req.body.password
						})
						bcrypt.genSalt(10, (err, salt) => {
							bcrypt.hash(newUser.password, salt, (err, hash) => {
								if (err) throw err;
								newUser.password = hash;
								newUser.save()
									.then((user) => {
 										res.json(user);

									})
									.catch((err) => {
										console.log(err);
									})
							})

						})
					})
					.catch((err) => {
						res.json(err)
					})
			}
		})
})

router.post('/login', (req, res) => {
	const { errors, isValid } = userValidator.loginValidator(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;
	userModel.findOne({ email })
		.then(user => {
			console.log("user is ",  user);
			if (!user) {
				errors.email = 'User not found';
				return res.status(404).json(errors);
			} 
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if (isMatch) {
						const payload = { id: user.id, name: user.name, photo: user.photo, user_role: user.user_role, email: user.email };
						jwt.sign(
							payload,
							keys.secretOrKey,
							{ expiresIn: 36000 },
							(err, token) => {
								res.json({
									success: true,
									token: 'bearer ' + token
								})
							});
					} else {
						errors.password = 'Incorrect password';
						res.status(400).json(errors);
					}
				})
		});
});

router.post('/login-admin', (req, res) => {
	console.log('done');
	const { errors, isValid } = userValidator.loginValidator(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;
	userModel.findOne({ email })
		.then(user => {
			if (!user) {
				errors.email = 'User not found';
				return res.status(404).json(errors);
			}
			if (!user.access) return res.json({ message: 'You are temporarily disabled ! Please contact the admin . ' })
			if (user.user_role === role.ADMIN_ROLE) {
				bcrypt.compare(password, user.password)
					.then(isMatch => {
						if (isMatch) {
							const payload = { id: user.id, name: user.name, photo: user.photo, user_role: user.user_role, email: user.email };
							jwt.sign(
								payload,
								keys.secretOrKey,
								{ expiresIn: 36000 },
								(err, token) => {
									res.json({
										success: true,
										token: 'bearer ' + token
									})
								});
						} else {
							errors.password = 'Incorrect password';
							res.status(400).json(errors);
						}
					})
			} else {
				return res.status(400).json({ message: 'You are not allowed to access this role' })
			}
		});
});
router.get('/all-user', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (req.user.user_role === 'admin') {
		UserModel.find()
			.then((users) => res.json(users))
			.catch((err) => res.json(err))
	} else {
		res.json({ message: "You are not allowed !!" })
	}
});

router.get('/delete-user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (req.user.user_role === 'admin') {
		UserModel.findOneAndDelete({ _id: req.params.id })
			.then((users) => res.json(users))
			.catch((err) => res.json(err))
	} else {
		res.json({ message: "You are not allowed !!" })
	}
});
router.get('/access-toggle-user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (req.user.user_role === 'admin') {
		UserModel.findOne({ _id: req.params.id })
			.then((user) => {
				if (!user) return res.json({ message: 'User not found !' })
				user.access = !user.access
				user.save()
					.then(resp => {
						return res.json({ message: 'Updated success ' })
					})
			})
			.catch((err) => res.json(err))
	} else {
		res.json({ message: "You are not allowed !!" })
	}
});
router.post('/update-user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	userModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(user => {
		res.json(user)
	}).catch(err => {
		res.json(err)
	})
})

// user can choose  plane from  onboarding list ( fron frontend , i did check  from postman  with  user ID )( the plan id contain id of  plan package , it refer to   a single package model)
router.get('/plan-choose/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	userModel.findOne(req.user._id)
		.then(docs => {
			docs.plan = req.params.id
			docs.save()
				.then(updated => { res.json(updated) })
				.catch(err => { res.json(err) })
		})
		.catch(err => { res.json(docs) })
})
// only authenticated  can  change ther  plan 
router.get('/update-plan/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	userModel.findOne(req.user._id)
		.then(docs => {
			docs.plan = req.params.id
			docs.save()
				.then(updated => { res.json(updated) })
				.catch(err => { res.json(err) })
		})
		.catch(err => { res.json(docs) })
})

//  after create there account  ,   will go a mail to  user account , and user will get  a button   after clicking  on that , we will redirecti user to a page ( need to design in frontend  to show  mail confirmation process )
router.get('/confirmations/:id', (req, res) => {
	console.log('confirmations')
	userModel.findOne({ _id: req.params.id })
		.then(docs => {
			console.log(docs)
			docs.confirmations = true
			docs.save()
				.then(updated => {
					console.log('confirmations success')
					res.json({ message: "Confirmation success !!!" })
				})
		})
		.catch(err => { res.json(err) })
})
module.exports = router;