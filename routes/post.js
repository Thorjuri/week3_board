const express = require('express');
const router = express.Router();
const commentRouter = require('./comment.js');
const Post = require('../schemas/post')
const Comment = require("../schemas/comment");

// router.use("/:postId/comment", [commentRouter]);
router.use("/comment", [commentRouter]);


// index.js에서 route 되어 들어온 '/board/post'


//게시글 상세보기 
//postId, title, content, name, date
router.get('/:postId', async(req, res) => {     
    const {postId} = req.params;
    const posts = await Post.find();  //db 전체 (형식 갖추지 않은 로우데이터)
    const post = posts.map((a)=>{return a}) //전체 게시글이 객체로 나열된 배열
    const postOne = post.filter((post)=> post.postId === Number(postId)) //게시글 1개가 객체로 배열

    const postView = postOne[0]  //배열의 0번째(id에 맞는 게시글 1개만 객체로 0번째 인덱스에 들어가있음)
   
    console.log(postView)
	res.json({postView});  //제이슨 형태로 response
});


//게시글 수정
//비밀번호 일치 확인 - 글번호 확인 - 본문 수정
router.put("/:postId", async (req, res) => {
    const { postId } = req.params;
    const { inputPassword } = req.body;
    const { postContent} = req.body;
    const existsPost = await Post.find({postId:Number(postId)});
    const password = existsPost[0].password  //게시글 1개가 배열로, 해당 객체의 password 속성
   
    if (Number(inputPassword) === password){
        await Post.updateOne({postId: postId},{$set: {postContent}})
    }else{
        res.status(400).json({errorMessage: "비밀번호가 다릅니다."})
    }
    
    res.json({successMessage: "게시글이 수정되었습니다." });
  });


//게시글 삭제
router.delete('/:postId', async(req,res)=>{
    const {postId} = req.params;
    const { inputPassword } = req.body;
    const existsPost = await Post.find({postId:Number(postId)});
    const password = existsPost[0].password  //게시글 1개가 배열로, 해당 객체의 password 속성

    if (existsPost.length > 0 && inputPassword===password){
        await Post.deleteOne({postId: Number(postId)}) 
            //혹은 await Cart.deleteOne({ goodsId });
    }
    res.json({successMessage: "게시글이 삭제되었습니다."});
});



module.exports = router;





