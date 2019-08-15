const { check } = require('express-validator');

exports.validate = method => {
    switch (method) {
        case 'createPost':
            return [
                check('text', 'Text is required')
                    .not()
                    .isEmpty()
            ];
    }
};
