//not that many routes so we will put them all together.

module.exports = (app, passport) =>{
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }))

    //callback after google authetnicated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect : '/',
        failureRedirect : '/nay'
    }));

    app.get('/', isAuth, (req, res) =>{
        res.render('index', {loggedInUser: req.user})
    })
}

function isAuth(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/auth/google') //change.
}