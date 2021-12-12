import connectDB from "../../middleware/mongodb";
// import bcrypt from 'bcryptjs';
import User from "../../models/user";

const signup = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    // Check if userName, email or password is provided
    const { userName, email, password } = req.body;
    if (userName && email && password) {
      try {
        // Hash password to store it in DB
        var user = new User({
          userName,
          email,
          password,
        });
        // Create new user
        var usercreated = await user.save();
        return res.status(200).send({ user: usercreated });
      } catch (error) {
        return res.status(500).send({ message: error.message });
      }
    } else {
      res.status(422).send({ message: "missing credentials" });
    }
  } else {
    res.status(422).send({ message: "req_method_not_supported" });
  }
};

export default connectDB(signup);
