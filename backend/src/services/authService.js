const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const salt = bcrypt.genSaltSync(10);

const hashUserPasswor = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
const checkUserEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      const userLecturer = db.Lecturer.findOne({
        where: { email: email },
      });
      if (userLecturer) {
        resolve(true);
      } else {
        const userStudent = db.Student.findOne({
          where: { email: email },
        });
        if (userStudent) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.JWT_ACCESS_KEY, {
    expiresIn: "30s",
  });
};
const generateRefreshToken = (data) => {
  return jwt.sign(data, process.env.JWT_REFRESH_KEY, {
    expiresIn: "365d",
  });
};
const handleLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      const isExit = await checkUserEmail(email);
      if (isExit) {
        let user = await db.Lecturer.findOne({
          attributes: ["email", "password", "roleId", "firstName", "lastName"],
          where: { email: email },
          raw: true,
        });
        user = user
          ? user
          : await db.Student.findOne({
              attributes: [
                "email",
                "password",
                "roleId",
                "firstName",
                "lastName",
              ],
              where: { email: email },
              raw: true,
            });
        if (user) {
          const checkPassword = await bcrypt.compareSync(
            password,
            user.password
          );
          if (checkPassword) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            delete user.password;
            const accessToken = generateAccessToken(user);
            userData.user = { ...user, accessToken };
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found~`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in the system. Plz try other email`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
const handleLogout = () => {
  return res
    .status(200)
    .json({ errCode: 0, message: "Logout is successfully" });
};
const handleRegister = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFromBcrypt = await hashUserPasswor(data.password);
      await db.Lecturer.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        code: data.code,
        firstName: data.firstName,
        lastName: data.lastName,
        number_phone: data.number_phone,
        birthday: data.birthday,
        address: data.address,
        genderId: data.genderId,
        roleId: data.roleId,
        statusId: data.statusId,
        departmentId: data.departmentId,
        image: data.image,
      });
      resolve({ errCode: 0, message: "Ok! Create a new user succeed" });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { handleLogin, handleRegister, handleLogout };
