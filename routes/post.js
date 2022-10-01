const express = require('express');
const router = express.Router();
const commentRouter = require('./comment.js');
const Post = require('../schemas/post')
const Comment = require("../schemas/comment");

router.use("/:postId/comment", [commentRouter]);


// index.js에서 route 되어 들어온 '/board/post'


//게시글 상세보기 
router.get('/:postId', (req, res) => {     
	res.send('게시글 상세보기 입니다.');  
});


//게시글 수정
router.put("/:postId", async (req, res) => {
    const { postId } = req.params;
    const { password } = req.body;
    res.json({ success: true });
  });


//게시글 삭제
router.delete('/goods/:goodsId/cart', async(req,res)=>{
const {goodsId} = req.params;

const existsCarts = await Cart.find({goodsId:Number(goodsId)});
if (existsCarts.length > 0){
    await Cart.deleteOne({goodsId:Number(goodsId)}) 
        //혹은 await Cart.deleteOne({ goodsId });
}
res.json({result: "success"});
});



module.exports = router;