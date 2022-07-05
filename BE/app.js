const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const app = express();


dotenv.config()

mongoose.connect(process.env.MONGOOSE_URL,{
  useNewUrlParser: true
},() =>{
    console.log("mogoose connect successs")
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/api/v1", auth)


app.listen(3000, () => {
  console.log(`Connect success port ${3000}`);
});
