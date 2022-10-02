const express = require('express');
const router = express.Router();
const Post = require('../schemas/post')
const Comment = require("../schemas/comment");


// post.js에서 route 되어 들어온 'board/post/comment/:postId/'


//댓글 작성하기
// content, name
router.post('/:postId/write', async(req,res)=>{
    const {postId} = req.params;
    const comments = await Comment.find();
    const comment = comments.filter((cmt)=>cmt.postId === Number(postId))
    // const comment = comments.map((cmt)=>{return cmt.cmtId})
    const existsComments = comment.length + 1
    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth()+1
    const day = ('0' + today.getDate()).slice(-2)
    const time = today.toLocaleTimeString('ko-kr')
    
    const {cmtContent} = req.body;
    const {cmtName} = req.body;
    const cmtDate = `${year}/${month}/${day} ${time}`

    if (cmtContent === "") {
        res.status(400).json({ errorMessage: "댓글을 입력해주세요." });
        return;
      }

    await Comment.create({
        postId: postId, 
        cmtId: existsComments,
        cmtContent: cmtContent,
        cmtName: cmtName,
        cmtDate: cmtDate
    })

    res.json({result: "success"});
});



//댓글목록 보기
//게시글이든 댓글이든, Id는 작성 순서대로 +1씩 되게 되있음. 즉 Id 순서 = 시간순서. Id로 내림차순 정렬 함.
router.get('/:postId', async(req, res) => {  
    const {postId} = req.params;
    const comments = await Comment.find();
    const comment = comments.map((cmt) => {return cmt});
    const commentMatch = comment.filter((cmt) => cmt.postId ===Number(postId));
    const commentDate = commentMatch.map((cmt)=>{return cmt.cmtDate})

    let commentSort = commentMatch.sort((a,b) => {
        return  b.cmtId - a.cmtId
        // if(a.commentDate > b.commentDate) return -1;
        // if(a.commentDate < b.commentDate) return 1;
        // return 0;
    })
	res.json({commentSort}) 
});



//댓글 수정
router.put("/:postId", async (req, res) => {
    const { postId } = req.params;
    const {cmtId} = req.body;
    const {cmtContent} = req.body;

    await Comment.updateOne({postId: postId, cmtId:cmtId}, {$set:{cmtContent}})

    res.json({ successMessage: "댓글이 수정되었습니다." });
  });


//댓글 삭제
router.delete('/:postId', async(req,res)=>{
    const {postId} = req.params;
    const {cmtId} = req.body;

    const targetPost = await Comment.find({postId:Number(postId)});
    const comment = targetPost.filter((cmt)=> cmt.cmtId === cmtId)
    if (comment.length > 0){
        await Comment.deleteOne({postId:Number(postId), cmtId:cmtId}) 
    }else {
        res.status(400).json({errorMessage:"댓글이 없습니다"})
    }
    res.json({successMessage: "댓글을 삭제했습니다."});
});




module.exports = router;


