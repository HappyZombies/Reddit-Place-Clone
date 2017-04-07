const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const config = require('../config')

module.exports = (passport) => {

    passport.serializeUser((user, done)=>{
        done(null, user)
    })

    passport.deserializeUser((obj, done)=>{
        done(null, obj)
    })


    passport.use(new GoogleStrategy({
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackURL
    }, (token, refreshToken, profile, done) => {
        process.nextTick(()=>{
            return done(null, profile)
        })
    }))


}