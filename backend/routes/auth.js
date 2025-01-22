const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();
const JWT_SECRET = 'iamgood';
// this route 1 for creating user 
router.post(
  '/createuser',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      // Hashing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Creating the user
      let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Creating a JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // Sending the response with the JWT token
       success=true;
      res.json({success,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);
// this ruote 2 this is made chat gpt for login 
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Compare the entered password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        success=false;
        return res.status(400).json({success, error: 'Invalid credentials' });
      }

      // If email and password match, create a JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // Send the token as a response
      success=true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);
// this is route 3 for giving data after login successfully
router.post(
  '/getuser',fetchuser,
  async (req, res) => {
    try {
      const userid=req.user.id;
      const user=await User.findById(userid).select("-password")
      res.send(user);
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
    }
);
module.exports = router;
