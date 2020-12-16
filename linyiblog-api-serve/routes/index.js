var express = require('express');
var router = express.Router();
let multer = require('multer');


var upload = multer({ dest: './public/uploads/' }).single('file')

let home = require('../controller/homeController')
let admin = require('../controller/admindController')

/*  home page. */
router.post('/api/getLinks', home.getLinks)
router.post('/api/getArticles', home.getArticles)
router.post('/api/getDetail', home.getDetail)
router.post('/api/getTags', home.getTags)
router.post('/api/getNewRecommend', home.getNewRecommend)
router.post('/api/getNotice', home.getNotice)
router.post('/api/getTop', home.getTop)
router.post('/api/search', home.search)
router.post('/api/getTecShare', home.getTecShare)
router.post('/api/getStudyNote', home.getStudyNote)
router.post('/api/getCasualNote', home.getCasualNote)
router.post('/api/getBookShare', home.getBookShare)
router.post('/api/upload', upload, home.upload)
router.post('/api/getBanner', home.getBanner)
router.post('/api/getAboutMe', home.getAboutMe)
router.post('/api/getAboutBlog', home.getAboutBlog)

router.get('/uploads/*', function (req, res) {
    res.sendFile( '/Users/mac/Desktop/linyiblog/linyiblog-api-serve/public/' + req.url );
})


/*  admin page. */
router.post('/api/login', admin.login)
router.post('/api/addArticle', admin.addArticle)
router.post('/api/setAbout', admin.setAbout)

module.exports = router;
