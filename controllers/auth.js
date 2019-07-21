const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};

exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Invalid Credentials'
                    }
                ]
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Invalid Credentials'
                    }
                ]
            });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) {
                    throw err;
                }
                return res.json({ token });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error!');
    }
};
