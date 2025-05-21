const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/userModel');

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/users/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        // Try to find by email and link accounts
        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          user.googleId = profile.id;
          await user.save();
        } else {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            photo: profile.photos[0].value,
            password: Math.random().toString(36).slice(-8), // random password
          });
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        // Try to find by email and link accounts
        const email = profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`;
        user = await User.findOne({ email });
        if (user) {
          user.facebookId = profile.id;
          await user.save();
        } else {
          user = await User.create({
            name: profile.displayName,
            email,
            facebookId: profile.id,
            photo: profile.photos[0].value,
            password: Math.random().toString(36).slice(-8), // random password
          });
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

module.exports = passport; 