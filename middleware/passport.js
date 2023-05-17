const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const userModel = require('../src/models/user');
const TOKEN_KEY = process.env.TOKEN_KEY;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: TOKEN_KEY
}

module.exports = passport => {
    passport.use(
        new jwtStrategy(options, async (payload, done)=>{
            try{
                const user = await userModel.findById(payload.uid).select('email id');
                if(user){
                    done(null, user);
                }else{
                    done(null, fasle)
                }
            }catch(e){
                console.log(e)
            }
            
        })
    )
}