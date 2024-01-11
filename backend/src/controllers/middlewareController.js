const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const middlewareController = {
  verifyToken: (req, res, next) => {
 // console.log("token middle", req.headers);

    const token = req.headers?.token;
 // console.log("token middle", token);
    if (token) {
      const accessToken = token.split(" ")[1];
   // console.log("accessToken middle", accessToken);
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, function (err, user) {
        if (err) {
          return res
            .status(403)
            .json({
              errCode: 403,
              errMessage: "Mã xác thực không hợp lệ, vui lòng đăng nhập lại!",
            });
        }
     // console.log("req", req.user);
        req.user = user;
        next();
      });
    } else {
      return res
        .status(401)
        .json({
          errCode: 401,
          errMessage: "Bạn chưa được xác thực, vui lòng đăng nhập!",
        });
    }
  },
  verifyTokenImport: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
   // console.log("req", req.user);

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
            errMessage: "Bạn không được phép nhập dữ liệu!",
          });
      }
    });
  },
  verifyTokenAdd: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
   // console.log("req", req.user);

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
            errMessage: "Bạn không được phép tạo dữ liệu!",
          });
      }
    });
  },
  verifyTokenView: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
   // console.log("req", req.user);

      if (
        req.user.roleId == "R1" ||
        req.user.roleId == "R2" ||
        req.user.permissions.split(",").includes("PERR")
      ) {
        next();
      } else {
        return res
          .status(403)
          .json({ errCode: 403, errMessage: "Bạn không được phép xem dữ liệu!" });
      }
    });
  },
  verifyTokenUpdate: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
   console.log("req", req.body);
      if (
        req.user.roleId == "R1" ||
        req.user.roleId == "R2" ||
        req.user?.permissions?.split(",")?.includes("PERU")||
        req.body?.data?.studentId == req.user.id||
        req.body?.data?.lecturerId == req.user.id
        ) {
        next();
      } else {
        return res
          .status(403)
          .json({
            errCode: 403,
            errMessage: "Bạn không được phép cập nhật dữ liệu!",
          });
      }
    });
  },
  verifyTokenUpload: (req, res, next) => {
    // middlewareController.verifyToken(req, res, () => {
   console.log("req", req.file);
      if (
        req.user.roleId == "R1" ||
        req.user.roleId == "R2" ||
        req.user.permissions.split(",").includes("PERU")||
        req.file?.studentId == req.user.id
      ) {
        next();
      } else {
        return res
          .status(403)
          .json({
            errCode: 403,
            errMessage: "Bạn không được phép cập nhật dữ liệu!",
          });
      }
    // });
  },
  verifyTokenDelete: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
   // console.log("req", req.user);
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
            errMessage: "Bạn không được phép xóa dữ liệu!",
          });
      }
    });
  },
};
module.exports = middlewareController;
