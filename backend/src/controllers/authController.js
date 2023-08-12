const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

let refreshTokens = [];
const salt = bcrypt.genSaltSync(10);

const authController = {
  // Register
  registerUser: async (req, res) => {
    try {
      const hashPasswordFromBcrypt = await bcrypt.hashSync(
        req.body.password,
        salt
      );

      const user = await db.Lecturer.create({
        email: req.body.email,
        password: hashPasswordFromBcrypt,
        code: req.body.code,
        fullName: req.body.fullName,
        number_phone: req.body.number_phone,
        birthday: req.body.birthday,
        address: req.body.address,
        genderId: req.body.genderId,
        roleId: req.body.roleId,
        statusId: req.body.statusId,
        departmentId: req.body.departmentId,
        image: req.body.image,
      });
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  // GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(user, process.env.JWT_ACCESS_KEY, { expiresIn: "30s" });
  },
  generateRefreshToken: (user) => {
    return jwt.sign(user, process.env.JWT_REFRESH_KEY, { expiresIn: "365d" });
  },
  loginUser: async (req, res) => {
    try {
      let userData = {};
      const hashed = await bcrypt.hash(req.body.password, salt);

      if (!req.body.email || !req.body.password) {
        return res
          .status(401)
          .json({ errCode: -1, message: "Missing inputs parameter!" });
      }
      //   findOne
      let user = await db.Lecturer.findOne({
        attributes: ["email", "password", "roleId", "fullName"],
        where: { email: req.body.email },
      });
      user = user
        ? user
        : await db.Student.findOne({
            attributes: [
              "email",
              "password",
              "roleId",
              "fullName",
            ],
            where: { email: req.body.email },
          });
      if (user) {
        const checkPassword = await bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (checkPassword) {
          delete user.password;
          console.log(user);
          // const accessToken = generateAccessToken(user);
          const accessToken = authController.generateAccessToken(user);
          const refreshToken = authController.generateRefreshToken(user);
          res;
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
          refreshTokens.push(refreshToken);
          console.log(
            "check refreshTokens: accessToken refreshToken refreshTokens",
            accessToken,
            refreshToken,
            refreshTokens
          );
          return res.status(200).json({
            errCode: 0,
            errMessage: "Ok",
            user: { ...user, accessToken },
          });
        } else {
          return res
            .status(200)
            .json({ errCode: 1, errMessage: "Wrong password" });
        }
      } else {
        return res.status(404).json({
          errCode: 2,
          errMessage: `Your's Email isn't exist in the system. Plz try other email`,
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  requestRefreshToken: async (req, res) => {
    // Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    console.log("check refresh refreshTokens:", refreshToken, refreshTokens);

    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not invalid");
    }
    // console.log(2, refreshTokens.includes(refreshToken));
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      delete user.exp;
      delete user.iat;
      console.log("user check refresh", user);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  },
  userLogout: (req, res) => {
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.clearCookie("refreshToken");
    return res.status(200).json("Logout is successfully");
  },
};
module.exports = authController;
