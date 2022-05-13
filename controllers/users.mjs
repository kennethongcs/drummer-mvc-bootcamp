import { getHashSalted, getHash } from '../helper_functions.mjs';

export default function initUsersController(db) {
  const userCreatePost = (req, res) => {
    db.User.create({
      name: req.body.name,
      password: getHash(req.body.password),
      created_at: new Date(),
      updated_at: new Date(),
    })
      .then((user) => {
        console.log(user);
        res.send('User Created Successfully');
      })
      .catch((err) => {
        console.log('user creation error', err);
      });
  };
  const userLoginDisplay = (req, res) => {
    res.render('users/login');
  };
  const userRegister = (req, res) => {
    res.render('users/signup');
  };
  const userLoginVerification = (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    const hashedPassword = getHash(password);

    db.User.findOne({
      where: {
        name: username,
      },
    })
      .then((user) => {
        console.log(user);
        const passwordDb = user.password;
        console.log(passwordDb);
        if (passwordDb === hashedPassword) {
          // if pass is the same, add cookie for userID and session
          res.cookie('userId', username);
          // hash session
          const saltedUserId = getHashSalted(username);
          res.cookie('sessionId', saltedUserId);
          res.redirect('/');
          console.log(`user ${username} logged in.`);
        } else {
          res.status(403).send('Sorry user/pass is wrong.');
        }
      })
      .catch((err) => {
        console.log('login error:', err);
      });
  };
  const userLogout = (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('sessionId');
    res.redirect('/');
  };

  const userDetails = (req, res, next) => {
    // set default value
    req.isUserLoggedIn = false;
    // check if cookie exists
    if (req.cookies.userId && req.cookies.sessionId) {
      // get the hashed value for sessionId
      const hash = getHashSalted(req.cookies.userId);
      // check if hashed userId and cookie sessionId is the same
      if (hash === req.cookies.sessionId) {
        // if both are the same then set true for isUserLoggedIn
        req.isUserLoggedIn = true;
        // look for user's values in DB
        db.User.findOne({
          where: {
            name: req.cookies.userId,
          },
        }).then((details) => {
          req.user = details;
          delete req.user.password;
        });
      }
    }
    next();
  };

  return {
    userCreatePost,
    userLoginDisplay,
    userRegister,
    userLoginVerification,
    userLogout,
    userDetails,
  };
}
