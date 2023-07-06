// authMiddleware.js
const verifyToken = require("./verificaToken");
const User = require("../models/users")

const isAdmin = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Missing token' });
    }

    const userId = verifyToken(token, res, req);
    const user = await User.findById(userId);
    if (user.rol !== 'admin') {
        return res.redirect('/home');
    }
    req.userId = user;
    next();
};

module.exports = isAdmin;
