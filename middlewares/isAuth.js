const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
       return res.status(403).json({
            error: 'Not Authenticated'
        });
    }
    const token = authHeader.split(' ')[1];
    let decodeToken ;
    try {
        decodeToken = jwt.verify(token, 'supersecretkey');
    } catch(error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
    if(!decodeToken) {
        res.json(403).json({
            error: 'Not Authenticated'
        });
    }

    req.userId= decodeToken.userId;
    next();
}