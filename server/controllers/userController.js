const userSchema = require("../models/UserModel");
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email, password: password });
    if (!user) {
      return res.status(400).json({ status: false, error: "Operation failed" });
    }
    res.status(200).json({ status: true, user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: "Operation failed" });
  }
};

const getUsersList = async (req, res) => {
  try {
    const users = await userSchema.find();
    res.status(200).json({ status: true, users });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Operation failed" });
  }
};

module.exports = {
  userLogin,
  getUsersList,
};
