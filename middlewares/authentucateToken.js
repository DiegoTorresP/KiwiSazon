const verifyToken = require("./verificaToken");

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.redirect('/login');
    }
  
    const userId = verifyToken(token, res, req);
    const user = await User.findById(userId);
    if (!userId) {
      return res.redirect('/login');
    }
  
    req.userId = user;
    next();
  };

  module.exports = authenticateToken;