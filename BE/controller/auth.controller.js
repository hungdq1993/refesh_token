const User = require("../models/User.models.js");
const bcrypt = require("bcrypt");
const authController = {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   * register user 
   */
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const User_new = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
     const user = await User_new.save();
      return res.status(200).json({
        user
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  /**
   * login register
   */
  login: async(req, res) =>{
    try {
      const user = await User.findOne({username: req.body.username})
      if(!user) return res.status(404).json({
        message: "User do not reister service",
        code: 1

      })
      const isValidationPass = await bcrypt.compare(req.body.password, user.password)
      if(!isValidationPass) return res.status(404).json({
        message: "password wrong!!!"
      })
      if(user && isValidationPass){
        return res.status(200).json({
          msg: "success",
          user
        })
      }
      
    } catch (error) {
      res.status(500).json({
        status: "Server error!!!"
      })
    }
  }
};
module.exports = authController;
