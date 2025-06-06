const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Genetrate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ------------------Register user----------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Genetrate Token
  const token = generateToken(user._id);

  // send HTTP-only Cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "lax",
    secure: false,
  });

  if (user) {
    const { _id, name, email, photo, phone, bio, role } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//----------------------------------- Login user-------------------------

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // validate Request

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and Password");
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not Found, Please Signup");
  }

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Genetrate Token
  const token = generateToken(user._id);

  // send HTTP-only Cookie
  if (passwordIsCorrect) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "lax",
      secure: false,
    });
    // Send login notification email
    try {
      const subject = "Login Notification";
      const message = `<h2>Hello ${user.name || user.email}</h2><p>You have successfully logged in to your account on the Salon Management System.</p><p>If this wasn't you, please reset your password immediately.</p><p>Regards,<br/>Salon Management Team</p>`;
      const send_to = user.email;
      const sent_from = process.env.EMAIL_USER;
      await sendEmail(subject, message, send_to, sent_from, sent_from);
    } catch (err) {
      console.error("Failed to send login notification email:", err);
      // Do not block login if email fails
    }
  }

  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio, role } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// ------------------------------------Logout User------------------------------
const logOut = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // expired
    sameSite: "lax",
    secure: false,
  });
  return res.status(200).json({ message: "Successfully LogOut" });
});

// Get User Data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    const { _id, name, email, photo, phone, bio, role } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      role,
    });
  } else {
    res.status(400);
    throw new Error("User Not found");
  }
});

// Get login Status
const LoginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  //verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//------------------------------ Update User------------------------
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    const { name, email, photo, phone, bio } = user;

    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// ---------------Change Password------------------------

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found, Please signUp");
  }

  //Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  // check if password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;

    await user.save();
    res.status(200).send("Password Change Successfully");
  } else {
    res.status(400);
    throw new Error("Old Password is incorrect");
  }
});

// ---------------------------Forgot Password ---------------

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Reset Token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save new resetToken to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  // Construct Reset Url

  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
  <h2>Hello ${user.name}</h2>
  <p>Please use the url below to reset your password</p>  
  <p>This reset link is valid for only 30minutes.</p>

  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

  <p>Regards...</p>
  <p>Pinvent Team</p>
`;

  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);

    res.status(200).json({ success: true, message: "Reset Email sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

//-----------------------Reset Password-----------

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // find token in DB

  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or expired Token");
  }

  //Find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: "Password Reset Successfull, Please Login",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logOut,
  getUser,
  LoginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
