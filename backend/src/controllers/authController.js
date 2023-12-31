const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");

let refreshTokens = [];
const salt = bcrypt.genSaltSync(10);

const authController = {
  // Register
  registerUser: async (req, res) => {
    try {
      const hashPasswordFromBcrypt = await bcrypt.hashSync(
        req?.body?.password,
        salt
      );

      const user = await db.Lecturer.create({
        email: req?.body?.email,
        password: hashPasswordFromBcrypt,
        code: req?.body?.code,
        fullName: req?.body?.fullName,
        number_phone: req?.body?.number_phone,
        birthday: req?.body?.birthday,
        address: req?.body?.address,
        genderId: req?.body?.genderId,
        roleId: req?.body?.roleId,
        statusId: req?.body?.statusId,
        departmentId: req?.body?.departmentId,
        image: req?.body?.image,
      });
      return res.status(200).json(user);
    } catch (error) {
   // console.log(error);
      return res.status(500).json({ errCode: -1, errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!" });
    }
  },
  // GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(user, process.env.JWT_ACCESS_KEY, {
      expiresIn: process.env.JWT_ACCESS_LIFE,
    });
  },
  generateRefreshToken: (user) => {
    return jwt.sign(user, process.env.JWT_REFRESH_KEY, {
      expiresIn: process.env.JWT_REFRESH_LIFE,
    });
  },
  loginUser: async (req, res) => {
    try {
      let isRole = "";
      if (!req?.body?.email || !req?.body?.password) {
        return res
          .status(401)
          .json({ errCode: -1, message: "Thiếu tham số đầu vào!" });
      }

   // console.log(req.body)
      //   findOne
      let userDB = await db.Lecturer.findOne({
        attributes: [
          "id",
          "email",
          "password",
          "roleId",
          "permissions",
          "refreshToken",
        ],
        where: {
          [Op.or]: {
            email: {
              [Op.like]: req?.body?.email,
            },
            code: {
              [Op.like]: req?.body?.email,
            },
          },
        },
      });
      if (userDB) {
        userDB;
        isRole = "Lecturer";
      } else {
        userDB = await db.Student.findOne({
          attributes: [
            "id",
            "email",
            "password",
            "roleId",
            "permissions",
            "refreshToken",
          ],
          where: {
            [Op.or]: {
              email: {
                [Op.like]: req?.body?.email,
              },
              code: {
                [Op.like]: req?.body?.email,
              },
            },
          },
        });
        isRole = "Student";
      }
      if (userDB) {
        const checkPassword = await bcrypt.compareSync(
          req?.body?.password,
          userDB.password
        );
        if (checkPassword) {
          const refreshTokenDB = userDB.refreshToken;

          delete userDB.password;
          delete userDB.refreshToken;
       // console.log(userDB);
          const accessToken = authController.generateAccessToken(userDB);
          const refreshToken = authController.generateRefreshToken(userDB);

          // if refreshToken còn hạn thì cấp access token, nếu hết hạn thì cấp access token + refresh token

          // console.log("jwt.verify", refreshTokenDB);
          if (refreshTokenDB) {
         // console.log("Đã vào được đây");
            jwt.verify(
              refreshTokenDB,
              process.env.JWT_REFRESH_KEY,
              async (err, user) => {
                // console.log("err,user", user);
                if (err) {
               // console.log("err,user", user);

                  const updateRefresh = await db[isRole].update(
                    {
                      refreshToken: refreshToken,
                    },
                    {
                      where: {
                        id: userDB.id,
                      },
                    }
                  );
               // console.log("updateRefresh", updateRefresh, refreshToken);
                  res;
                  res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                  });
               // console.log("usêuser", userDB);

                  if (updateRefresh) {
                    return res.status(200).json({
                      errCode: 0,
                      errMessage: "Đăng nhập thành công.",
                      user: { ...userDB, accessToken },
                    });
                  } else {
                    return res.status(200).json({
                      errCode: 3,
                      errMessage: "Vui lòng thử lại sau!",
                    });
                  }
                } else {
                  delete user.exp;
                  delete user.iat;
                  res;
                  res.cookie("refreshToken", refreshTokenDB, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                  });
                  return res.status(200).json({
                    errCode: 0,
                    errMessage: "Đăng nhập thành công.",
                    user: { ...user, accessToken },
                  });
                }
              }
            );
          } else {
         // console.log("err userDB", userDB);

            const updateRefresh = await db[isRole].update(
              {
                refreshToken: refreshToken,
              },
              {
                where: {
                  id: userDB.id,
                },
              }
            );
         // console.log("updateRefresh", updateRefresh);
            res;
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "strict",
            });
            if (updateRefresh) {
              return res.status(200).json({
                errCode: 0,
                errMessage: "Đăng nhập thành công.",
                user: { ...userDB, accessToken },
              });
            } else {
              return res.status(200).json({
                errCode: 3,
                errMessage: "Vui lòng thử lại sau!",
              });
            }
          }
        } else {
          return res
            .status(200)
            .json({ errCode: 1, errMessage: "Sai mật khẩu!" });
        }
      } else {
        return res.status(404).json({
          errCode: 2,
          errMessage: `Email của bạn không tồn tại trong hệ thống. Vui lòng thử email khác!`,
        });
      }
    } catch (error) {
      return res.status(500).json({ errCode: -1, errMessage: "Dữ liệu không mong muốn, thử lại sau hoặc dữ liệu khác!" });
    }
  },

  requestRefreshToken: async (req, res) => {
    // Take refresh token from user
    // console.log("req",req);
    const refreshToken = req?.cookies?.refreshToken;
    // console.log("check refresh refreshTokens:", refreshToken, refreshTokens);
 // console.log("check refresh refreshTokens:", refreshToken);

    if (!refreshToken) return res.status(401).json("Bạn chưa được xác thực!");

    let isRole = "";
    let userDB = null;
    if (req?.body?.roleId != "R4") {
      userDB = await db.Lecturer.findOne({
        where: { email: req?.body?.email },
      });
      isRole = "Lecturer";
    } else {
      userDB = await db.Student.findOne({
        where: { email: req?.body?.email },
      });
      isRole = "Student";
    }
 // console.log("userDB", userDB);
 // console.log("đã tới", userDB.refreshToken, refreshToken);
    if (userDB && userDB.refreshToken != refreshToken) {
      return res.status(403).json("Mã thông báo làm mới không hợp lệ!");
    }
    // console.log(2, refreshTokens.includes(refreshToken));
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json("Mã thông báo không hợp lệ!");
      }
      delete user.exp;
      delete user.iat;
   // console.log("user check refresh", user);
      const newAccessToken = authController.generateAccessToken(user);
      res.cookie("refreshToken", userDB.refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  },
  userLogout: async (req, res) => {
    let userDB = null;
    if (req?.body?.roleId != "R4") {
      userDB = await db.Lecturer.update(
        { refreshToken: null },
        {
          where: { email: req?.body?.email },
        }
      );
    } else {
      userDB = await db.Student.update(
        { refreshToken: null },
        {
          where: { email: req?.body?.email },
        }
      );
    }
    if (userDB) {
      res.clearCookie("refreshToken");
      return res.status(200).json("Đăng xuất thành công.");
    } else {
      return res.status(400).json("Đã xảy ra lỗi!");
    }
  },
};
module.exports = authController;
