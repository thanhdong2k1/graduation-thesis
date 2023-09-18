const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
// const jsonwebtoken = require("jsonwebtoken");
// const mysql2 = require("mysql2");
const connectDB = require("./config/connectDB");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();

const app = express();

// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const port = process.env.PORT || 8080;
//port = undefined =? port = 8080

app.listen(port, () => {
  //callback
  console.log("Running on the port: " + port);
});
