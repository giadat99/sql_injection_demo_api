const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');

exports.signup = async (req, res, next) => {
    const { username, password, email, name } = req.body;
    const user = new UserModel(username, email, password, name);
    try {
        const result = await user.save();
        const token = jwt.sign({
            username,
            name
        }, 'supersecretkey', { expiresIn: '1h' });
        res.json({
            message: 'Created user successfully',
            access_token: token
        });
    } catch(err){
        res.json({
            error: err.message
        })
    }
}


exports.login = async (req, res, next) => {
    const { username, password } = req.body;

   try {
    const [data] =  await UserModel.login(username, password);
    if(data.length > 0) {
        const token = jwt.sign({
            userId: data[0].id,
            username: data[0].username,
            name: data[0].name
        }, 'supersecretkey', { expiresIn: '1h' });
        res.json({
            message: 'Login successfully',
            access_token: token
        });
    } else {
        res.status(403).json({
            error: 'Not authenticated'
        })
    }
   } catch(err) {
       res.json({
           error: err.message
       })
   }
    
}