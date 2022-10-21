const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const user = await User.findOne({ token: token }).select("account");
    if (!user) {
      res.json({ message: "Pas autorisé" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = isAuthenticated;
