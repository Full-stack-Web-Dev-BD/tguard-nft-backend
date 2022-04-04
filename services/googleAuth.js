const passport = require("passport");
const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')
module.exports = app => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email"
            ]
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {

            const payload = { id: req.user._id, name: req.user.name, photo: req.user.photo, user_role: req.user.user_role, email: req.user.email };
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
            res.redirect("/profile");
        }
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
};
