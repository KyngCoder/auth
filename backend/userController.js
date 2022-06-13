const User = require("./userModel");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


dotenv.config()

const loginUser = async (req, res) => {
    const { name, password } = req.body;
  
    try {
      const existingUser = await User.find({ name });
  
      if (!existingUser) {
        return res.status(404).json({ message: "User do not exist" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser[0].password
      );
  
      if (!isPasswordCorrect) {
        console.log("wrong password");
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { name: existingUser[0].name, id: existingUser[0].id },
        "test",
        { expiresIn: "1h" }
      );
  
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.log(error)
      return res.status(500).json({ message: "something went wrong" });
    }
  };
  
const signUp = async (req, res) => {
  const { name, password } = req.body;

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });


    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      password: hashedPassword,
      name:name
    });
    console.log(result);

    const token = jwt.sign(
      { name: result.name, id: result._id },
       process.env.SECRET,
        { expiresIn: "1h",});

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
  
  module.exports = {
   signUp,
   loginUser
  };