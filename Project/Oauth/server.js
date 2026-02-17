import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
//session middleware
app.use(
    session({
        secret: "Hello123",
        resave: false,
        saveUninitialized: false
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

//deserialize user
passport.deserializeUser((user, done) => {
    done(null, user);
});

//configure google strategy
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    }, 
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    })
);
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
});

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        accessType: 'offline',
        prompt: 'consent'
    })
);

//callback route
app.get(
    '/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.send(`Welcome ${req.user.displayName}`);
    }
);

app.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});