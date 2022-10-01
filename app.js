const express = require('express');
const app = express();
const port = 3000;
const boardRouter = require("./routes/index");
const connect = require("./schemas");
connect();

//전역 미들웨어
app.use(express.json());
// 미들웨어[1] /board --> index.js 이동
app.use("/board", [boardRouter]);




app.get('/', (req,res)=> {
    console.log('메인 페이지');
    res.send('메인 페이지 입니다');
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });

