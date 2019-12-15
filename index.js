const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const fs = require('fs');


// Router       
const index1Router = require('./routes/index1');
const aboutusRouter = require('./routes/aboutus');
const chooseRouter = require('./routes/choose');
const mainPageRouter = require('./routes/atoz');
const pureRouter = require('./routes/pure');
const weatherRouter = require('./routes/weather');
const communityRouter = require('./routes/community');
const contactRouter = require('./routes/contact');
const usersRouter = require('./routes/users');
// Test
const testRouter = require('./routes/test');
const templateRouter = require('./routes/template');

const app = express();

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Static & view
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, './views/ejs'));

app.use('/', index1Router);
app.use('/atoz', mainPageRouter);
app.use('/aboutus', aboutusRouter);
app.use('/choose', chooseRouter);
app.use('/contact', contactRouter);
app.use('/pure', pureRouter);
app.use('/weather', weatherRouter);
app.use('/users', usersRouter);
app.use('/community', communityRouter);

/* Attractions router*/
const a_Router = require('./routes/attractions/a');
const b_Router = require('./routes/attractions/b');
const c_Router = require('./routes/attractions/c');
const d_Router = require('./routes/attractions/d');
const e_Router = require('./routes/attractions/e');
const f_Router = require('./routes/attractions/f');
const g_Router = require('./routes/attractions/g');
const h_Router = require('./routes/attractions/h');
const i_Router = require('./routes/attractions/i');
const j_Router = require('./routes/attractions/j');
const k_Router = require('./routes/attractions/k');
const l_Router = require('./routes/attractions/l');
const m_Router = require('./routes/attractions/m');
const n_Router = require('./routes/attractions/n');
const o_Router = require('./routes/attractions/o');
const p_Router = require('./routes/attractions/p');
const q_Router = require('./routes/attractions/q');
const r_Router = require('./routes/attractions/r');
const s_Router = require('./routes/attractions/s');
const t_Router = require('./routes/attractions/t');
const u_Router = require('./routes/attractions/u');
const v_Router = require('./routes/attractions/v');
const w_Router = require('./routes/attractions/w');
const x_Router = require('./routes/attractions/x');
const y_Router = require('./routes/attractions/y');
const z_Router = require('./routes/attractions/z');

app.use('/a', a_Router);
app.use('/b', b_Router);
app.use('/c', c_Router);
app.use('/d', d_Router);
app.use('/e', e_Router);
app.use('/f', f_Router);
app.use('/g', g_Router);
app.use('/h', h_Router);
app.use('/i', i_Router);
app.use('/j', j_Router);
app.use('/k', k_Router);
app.use('/l', l_Router);
app.use('/m', m_Router);
app.use('/n', n_Router);
app.use('/o', o_Router);
app.use('/p', p_Router);
app.use('/q', q_Router);
app.use('/r', r_Router);
app.use('/s', s_Router);
app.use('/t', t_Router);
app.use('/u', u_Router);
app.use('/v', v_Router);
app.use('/w', w_Router);
app.use('/x', x_Router);
app.use('/y', y_Router);
app.use('/z', z_Router);

// Parallax attractions
const a2_Router = require('./routes/attractions_parallax/a');
const b2_Router = require('./routes/attractions_parallax/b');
const c2_Router = require('./routes/attractions_parallax/c');
const d2_Router = require('./routes/attractions_parallax/d');
const e2_Router = require('./routes/attractions_parallax/e');
const f2_Router = require('./routes/attractions_parallax/f');
const g2_Router = require('./routes/attractions_parallax/g');
const h2_Router = require('./routes/attractions_parallax/h');
const i2_Router = require('./routes/attractions_parallax/i');
const j2_Router = require('./routes/attractions_parallax/j');
const k2_Router = require('./routes/attractions_parallax/k');
const l2_Router = require('./routes/attractions_parallax/l');
const m2_Router = require('./routes/attractions_parallax/m');
const n2_Router = require('./routes/attractions_parallax/n');
const o2_Router = require('./routes/attractions_parallax/o');
const p2_Router = require('./routes/attractions_parallax/p');
const q2_Router = require('./routes/attractions_parallax/q');
const r2_Router = require('./routes/attractions_parallax/r');
const s2_Router = require('./routes/attractions_parallax/s');
const t2_Router = require('./routes/attractions_parallax/t');
const u2_Router = require('./routes/attractions_parallax/u');
const v2_Router = require('./routes/attractions_parallax/v');
const w2_Router = require('./routes/attractions_parallax/w');
const x2_Router = require('./routes/attractions_parallax/x');
const y2_Router = require('./routes/attractions_parallax/y');
const z2_Router = require('./routes/attractions_parallax/z');

app.use('/b2', b2_Router);
app.use('/a2', a2_Router);
app.use('/c2', c2_Router);
app.use('/d2', d2_Router);
app.use('/e2', e2_Router);
app.use('/f2', f2_Router);
app.use('/g2', g2_Router);
app.use('/h2', h2_Router);
app.use('/i2', i2_Router);
app.use('/j2', j2_Router);
app.use('/k2', k2_Router);
app.use('/l2', l2_Router);
app.use('/m2', m2_Router);
app.use('/n2', n2_Router);
app.use('/o2', o2_Router);
app.use('/p2', p2_Router);
app.use('/q2', q2_Router);
app.use('/r2', r2_Router);
app.use('/s2', s2_Router);
app.use('/t2', t2_Router);
app.use('/u2', u2_Router);
app.use('/v2', v2_Router);
app.use('/w2', w2_Router);
app.use('/x2', x2_Router);
app.use('/y2', y2_Router);
app.use('/z2', z2_Router);
2
// Test router
app.use('/test', testRouter);
app.use('/template', templateRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);