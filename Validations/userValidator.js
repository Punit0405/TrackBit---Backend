const { check ,validationResult} = require('express-validator');
exports.validateUser = [
    check('name',"Name should have atlease 3 letters").isLength({min:3}),
    check('password',"Password must have atleast 8 characters").isLength({min:3}),
    check('email',"Email id is not valid").isEmail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array().map((error)=>{
                   return {
                       value:error.value,
                       msg:error.msg
                   }
            }) });
        }
        else next();
    }
];