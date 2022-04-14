const { check ,validationResult} = require('express-validator');
exports.validateDaily = [
    check('title',"Title Should Contain atleast 6 letters").isLength({min:6}),
    check('description',"Description should contain atleast 10 letters").isLength({min:10}),

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