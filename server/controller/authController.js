
const jwt = require('jsonwebtoken');
const User = require('../model/users');
const bcrypt = require('bcrypt');
require('dotenv').config();

/**
 * Register a new user
 * req.body is expected to contain {username: required(string), password: required(string)}
 */
// const register = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ error: 'username and password required' });
//     }

//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ error: 'Password must be at least 6 characters' });
//     }
//     const salt = await bcrypt.genSaltSync(10);
//     const hashed = await bcrypt.hash(password, salt);
//     const user = await User.create({
//       username: username,
//       salt: salt,
//       password: hashed
//     });
//     if(!user) return res.sendStatus(500);

//     const token = jwt.sign(
//       { id: user._id},
//       process.env.JWT_SECRET,
//       { expiresIn: 86400 }
//     );

//     res.json({
//       token: token,
//     });

//   } catch (error) {
//     next(error);
//   }
// };

/**
 * Authenticate an existing user
 * req.body is expected to contain {username: required(string), password: required(string)}
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password required' });
    }
    const user = await User.findOne({
        username: username,
    });

    if(user){
      if (user.username === username){
        if(bcrypt.compareSync(user.password, password)) return res.status(401).json({error: "Wrong username and/or password"});
        const token = jwt.sign({
            id: user._id
          }
          , process.env.JWT_SECRET, {expiresIn: 3600});
        res.status(200).json({  
          token: token 
        })
      }
    } else{
      return res.status(401).json({error: "Wrong username and/or password"});
    }  
  } catch (error) {
    console.log(error)
    next(error);
  }
};



module.exports = {login};