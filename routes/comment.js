const express = require('express');
const router = express.Router();
const Post = require('../schemas/post')
const Comment = require("../schemas/comment");


// post.js에서 route 되어 들어온 'board/post/:postId/comment/'


//댓글 작성하기
router.post('/write', async(req,res)=>{
    const { postId } = req.params;
    res.json({result: "success"});
});



//댓글목록 보기
router.get('/', (req, res) => {     
	res.send('댓글 전체목록 보기입니다.');  
});


//댓글 수정
router.put("/", async (req, res) => {
    const { postId } = req.params;
    const { password } = req.body;
    res.json({ success: true });
  });


//댓글 삭제
router.delete('/', async(req,res)=>{
const {goodsId} = req.params;

const existsCarts = await Cart.find({goodsId:Number(goodsId)});
if (existsCarts.length > 0){
    await Cart.deleteOne({goodsId:Number(goodsId)}) 
        //혹은 await Cart.deleteOne({ goodsId });
}
res.json({result: "success"});
});




module.exports = router;


