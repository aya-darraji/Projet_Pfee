const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: String,
    age: Number,
    image_user: { type: String, required: false, default: "client.png" },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["admin", "client"] },
    isconnect: Boolean,
    active: Boolean,
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }], // Référence vers l'utilisateur
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const User = this;
    User.password = await bcrypt.hash(User.password, salt);
    User.isconnect = false;
    User.active = false;
    next();
  } catch (error) {
    next(error);
  }
});



userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      //if (user.active === true) {
        // if (user.ban === false) {
        return user;
        // }
        // throw new Error("votre compte a ete banne");
      //}
      throw new Error("Activation require");
    }
    throw new Error("Invalid Password");
  }
  throw new Error("Invalid Email");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
