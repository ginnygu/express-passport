var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var User = require("../../users/model/User");
var keys = process.env.JWT_USER_SECRET;

var jwtOpts = {};

jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = keys;

var userJWTLoginStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
  var userEmail = payload.email;

  try {
    if (userEmail) {
      let user = await User.findOne({ email: userEmail }).select(
        "-password -__v"
      );

      if (!user || user === null) {
        //error
        return done(null, false);
      } else {
        //next
        return done(null, user);
      }
    } else {
      //error
      return done(null, false);
    }
  } catch (e) {
    //error
    return done(e, false);
  }
});

module.exports = userJWTLoginStrategy;
