const mongoose = require("mongoose");

const connect = () => {
  mongoose
  .connect("mongodb+srv://sparta:sparta@cluster0.15mplrd.mongodb.net/week3_board")
  // .connect("mongodb://localhost:27017/week3_board")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;