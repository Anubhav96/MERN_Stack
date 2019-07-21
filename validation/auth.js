const { check } = require('express-validator');

exports.validate = method => {
    switch (method) {
        case 'authenticate':
            return [
                check('email', 'Please include a valid email').isEmail(),
                check('password', 'Password is required').exists()
            ];
    }
};
