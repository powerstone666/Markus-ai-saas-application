import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../Schema/user.model.js';

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey =process.env.SECRET_KEY;

passport.use(new JwtStrategy(opts, async (jwt_payload, done)=>{
  
    try{
    const verification=await User.findOne({email: jwt_payload.email});
     if (verification) {
        return done(null, verification);
    } else {
        return done(null, false);
    }
}
catch(err){
    return done(err, false);
}
}));

export default passport;