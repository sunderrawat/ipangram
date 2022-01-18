const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');

const genrateJwt = async function (id) {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIERS_IN,
  });
  return token;
};

//middelware for checking user is login or not
exports.protect = async (req, res, next) => {
  try {
    let token;
    //check token is available in header or cookie if available the put in token variable
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    //if token not available then send error
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Login into app to access the content',
      });
    }

    //decoede and verify the jwt token and find id
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    //pass the user details to next middelware or handler
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Login into app to access the content',
      });
    }
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      status: 'fail',
      message: 'Login into app to access the content',
    });
  }
};

//check user role to route protection
exports.accessTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'you are not authorize to that route',
      });
    }

    next();
  };
};

exports.signUpUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role || 'employee',
    });
    const token = await genrateJwt(user._id);
    if (!user) {
      res.status(400).json({
        status: 'fail',
        message: 'user not created',
      });
    }
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
      message: 'user created successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: 'user not created',
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'user credientials are incorrect',
      });
    }

    if (user) {
      const passwordCheck = await user.checkPassword(password, user.password);
      user.password = undefined;
      if (!passwordCheck) {
        return res.status(401).json({
          status: 'fail',
          message: 'user credientials are incorrect',
        });
      }
      const token = await genrateJwt(user._id);
      return res.status(200).json({
        status: 'success',
        token,
        message: 'user login success',
        user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: 'server error',
    });
  }
};
