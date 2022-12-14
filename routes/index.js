const express = require('express');
const router = express.Router();
const postRouter = require('./post.js');
const Post = require('../schemas/post')
const Comment = require("../schemas/comment");
const { db } = require('../schemas/post');

// post.js 로 이동
router.use("/post", [postRouter]);


// 게시글 목록 전체 불러오기 (localhost:3000/board/list) --- 완료
router.get('/list', async(req, res) => {   
    const posts = await Post.find();
    const post = posts.map((post)=> {return post});
    const postDate = posts.map((post)=>{return post.postDate});

    let postSort = post.sort((a,b) => {
        if(a.postDate > b.postDate) return -1;
        if(a.postDate < b.postDate) return 1;
        return 0;
    })
    
    console.log(postSort, postDate)

	res.json({postSort});  
});


//게시글 작성하기 (localhost:3000/board/write) --- 완료
router.post('/write', async(req,res)=>{
    const posts = await Post.find();
    const post = posts.map((post)=>{return post.postId})
    const today = new Date()
    const year = today.getFullYear();
    const month = today.getMonth()+1
    const day = ('0' + today.getDate()).slice(-2)
    const time = today.toLocaleTimeString('ko-kr')
    
    const existsPost = post.length + 1
    const {title} = req.body;
    const {postContent} = req.body;
    const {postName} = req.body;
    const postDate = `${year}/${month}/${day} ${time}`
    const {password} = req.body
    
    await Post.create({
            postId: existsPost, 
            title: title,
            postContent: postContent,
            postName: postName,
            postDate: postDate,
            password: password
    })

    res.json({result: "success"});
});


//라우트해서 도착할 페이지에 필요
module.exports = router;





/*index는 원래는 미들웨어(라우터들의 허브)로 쓰는데
나는 여기에도 랜딩페이지 만들기로 함.
대신 '/' 주소로 들어오는 건 없고 바로 URI 붙여서 아래 2 API 구성*/