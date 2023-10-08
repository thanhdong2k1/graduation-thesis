const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const middlewareController = {
  verifyToken: (req, res, next) => {
    console.log("token middle", req.headers);

    const token = req.headers?.token;
    console.log("token middle", token);
    if (token) {
      const accessToken = token.split(" ")[1];
      console.log("accessToken middle", accessToken);
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, function (err, user) {
        if (err) {
          return res
            .status(403)
            .json({
              errCode: 403,
              errMessage: "Authentication code is invalid, please log in again",
            });
        }
        console.log("req", req.user);
        req.user = user;
        next();
      });
    } else {
      return res
        .status(401)
        .json({
          errCode: 401,
          errMessage: "You're not authenticated, please log in",
        });
    }
  },
  verifyTokenImport: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      console.log("req", req.user);

      if (
        req.user.roleId == "R1" ||
        req.user.roleId == "R2" ||
        req.user.permissions.split(",").includes("PERI")
      ) {
        next();
      } else {
        return res
          .status(403)
          .json({
            errCode: 403,
            errMessage: "You're not allowed to import data",
          });
      }
    });
  },
  verifyTokenAdd: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      console.log("req", req.user);

      if (
        req.user.roleId == "R1" ||
        req.user.roleId == "R2" ||
        req.user.permissions.split(",").includes("PERC")
      ) {
        next();
      } else {
        return res
          .status(403)
          .json({
            errCode: 403,
            errMessage: "You're not allowed to create data",
          });
      }
    });
  },
  verifyTokenView: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      console.log("req", req.user);

      if (
        req.user.roleId == "R1" ||
        req.user.roleId == "R2" ||
        req.user.permissions.split(",").includes("PERR")
      ) {
        next();
      } else {
        return res
          .status(403)
          .json({ errCode: 403, errMessage: "You're not allowed to view data" });
      }
    });
  },
  verifyTokenUpdate: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      console.log("req", req.user);
      if (
        req.user.roleId == "R1" ||
        req.user.roleId == "R2" ||
        req.user.permissions.split(",").includes("PERU")
      ) {
        next();
      } else {
        return res
          .status(403)
          .json({
            errCode: 403,
            errMessage: "You're not allowed to update data",
          });
      }
    });
  },
  verifyTokenDelete: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      console.log("req", req.user);
      if (
        req.user.roleId == "R1" ||
        req.user.roleId == "R2" ||
        req.user.permissions.split(",").includes("PERU")
      ) {
        next();
      } else {
        return res
          .status(403)
          .json({
            errCode: 403,
            errMessage: "You're not allowed to delete data",
          });
      }
    });
  },
};
module.exports = middlewareController;
