//not that many routes so we will put them all together.
const config = require('../config')

module.exports = (app, passport) =>{
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }))

    //callback after google authetnicated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect : '/',
        failureRedirect : '/nay'
    }));

    app.get('/', isAuth, (req, res) =>{
        if(req.user === undefined){
            req.user = {}
        }
        res.render('index', {loggedInUser: req.user})
    })
}

function isAuth(req, res, next) {
    if(config.googleAuth.clientSecret === '' || config.googleAuth.clientID === ''){
        return next()
        // google login is optional if no client secret or id given.
    }
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/auth/google') //change.
}