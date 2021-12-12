import connectDB from "../../middleware/mongodb";
// import bcrypt from 'bcryptjs';
import User from "../../models/user";

const login = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    const { email, password } = req.body;
    let query = { email: email };
    User.findOne(query, function(err, user) {
      if (err) throw [err];
      if (!user) {
        //console.log("no user found")
        return res.status(422).send({ message: "No user found" });
      }
      if (password === user.password) {
        res.status(200).send({ user });
      } else {
        res.status(422).send({ message: "invalid credentials" });
      }
      // Match Password
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) throw [err];
        if (isMatch) {
          //console.log("user :",user)
          return done(null, user, [{ success: "Login Successful" }]);
        } else {
          //console.log("wrong password")
          return done(null, false, [{ error: "Wrong password" }]);
        }
      });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
export default connectDB(login);
