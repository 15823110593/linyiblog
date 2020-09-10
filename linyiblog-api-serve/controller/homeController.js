var dbConfig = require('../util/dbconfig')
let fs = require('fs');

//获取友情链接
getLinks = (req, res) => {

    let sql = "select * from links";
    let sqlArr = [];
    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//获取最新发布文章
getArticles = (req, res) => {

    let sql = "select id,title,tags,abstract,pic,tec_share,study_note,casual_note,book_share,user,read_num,com_num,create_time from article where notice_flag = 0 && top_flag = 0 Order By create_time Desc";
    let sqlArr = [];
    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//获取最新发布文章详情
getDetail = (req, res) => {
    let { id } = req.body
    let sql = `select * from article where id=?`;
    let sqlArr = [id];
    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            let read_num = data[0].read_num +=1
            let sql2 = `UPDATE article SET read_num = ? WHERE id = ?`
            let sqlArr2 = [read_num, id]
            dbConfig.sqlConnect(sql2, sqlArr2, function (err, data) {
                if (err){
                    console.log('链接错误')
                } else {
                    console.log('阅读数量修改成功')
                }
            })
            res.send({
                'code': 200,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//获取热门标签
getTags = (req, res) => {
    let sql = "select * from tags Order By num Desc limit 0,20";
    let sqlArr = [];
    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//获取最新推荐
getNewRecommend = (req, res) => {
    let sql = "select id,title from article where notice_flag = 0 && top_flag = 0  Order By create_time Desc";
    let sqlArr = [];
    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//获取公布
getNotice = (req, res) => {
    let sql = "select id,title,abstract from article where notice_flag = 1 Order By create_time Desc";
    let sqlArr = [];
    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//获取顶置
getTop = (req, res) => {
    let sql = "select id,title,abstract from article where top_flag = 1 Order By create_time Desc";
    let sqlArr = [];
    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}

//搜索
search = (req, res) => {
    let params = {};
    params.page = Number(req.body.page) || 1;
    params.pageSize = Number(req.body.pageSize) || 10;
    let { keyWord } = req.body
    let pageSize = params.pageSize;
    let page = (params.page - 1) * pageSize;

    let sqlArr1 = [page, pageSize];
    let sqlArr2 = [];

    let total = '';

    let sql1 =` SELECT * from article where tags LIKE '%${keyWord}%' limit ?,?;`
    let sql2 = `SELECT COUNT(id) as total FROM article where tags LIKE '%${keyWord}%';`

    let callBack2 = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            console.log(data)
            total = data[0].total
            dbConfig.sqlConnect(sql1, sqlArr1, callBack)
        }
    }

    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'page': params.page,
                'pageSize': pageSize,
                'total': total,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql2, sqlArr2, callBack2)
}

//获取技术分享
getTecShare = (req, res) => {
    let params = {};
    params.page = Number(req.body.page) || 1;
    params.pageSize = Number(req.body.pageSize) || 10;
    let { keyWord } = req.body
    let pageSize = params.pageSize;
    let page = (params.page - 1) * pageSize;

    let sqlArr1 = [page, pageSize];
    let sqlArr2 = [];

    let total = '';

    let sql1 =` select id,title,tags,abstract,pic,tec_share,study_note,casual_note,book_share,user,read_num,com_num,create_time from article where notice_flag = 0 && top_flag = 0 && tec_share = 1  Order By create_time Desc limit ?,? ;`
    let sql2 = `SELECT COUNT(id) as total FROM article where notice_flag = 0 && top_flag = 0 && tec_share = 1;`

    let callBack2 = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            console.log(data)
            total = data[0].total
            dbConfig.sqlConnect(sql1, sqlArr1, callBack)
        }
    }

    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'page': params.page,
                'pageSize': pageSize,
                'total': total,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql2, sqlArr2, callBack2)

}

//获取学习笔记
getStudyNote = (req, res) => {
    let params = {};
    params.page = Number(req.body.page) || 1;
    params.pageSize = Number(req.body.pageSize) || 10;
    let { keyWord } = req.body
    let pageSize = params.pageSize;
    let page = (params.page - 1) * pageSize;

    let sqlArr1 = [page, pageSize];
    let sqlArr2 = [];

    let total = '';

    let sql1 =` select id,title,tags,abstract,pic,tec_share,study_note,casual_note,book_share,user,read_num,com_num,create_time from article where notice_flag = 0 && top_flag = 0 && study_note = 1 Order By create_time Desc limit ?,?;`
    let sql2 = `SELECT COUNT(id) as total FROM article where notice_flag = 0 && top_flag = 0 && study_note = 1;`

    let callBack2 = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            console.log(data)
            total = data[0].total
            dbConfig.sqlConnect(sql1, sqlArr1, callBack)
        }
    }

    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'page': params.page,
                'pageSize': pageSize,
                'total': total,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql2, sqlArr2, callBack2)

}

//获取心情随笔
getCasualNote = (req, res) => {
    let params = {};
    params.page = Number(req.body.page) || 1;
    params.pageSize = Number(req.body.pageSize) || 10;
    let { keyWord } = req.body
    let pageSize = params.pageSize;
    let page = (params.page - 1) * pageSize;

    let sqlArr1 = [page, pageSize];
    let sqlArr2 = [];

    let total = '';

    let sql1 =` select id,title,tags,abstract,pic,tec_share,study_note,casual_note,book_share,user,read_num,com_num,create_time from article where notice_flag = 0 && top_flag = 0 && casual_note = 1 Order By create_time Desc limit ?,?;`
    let sql2 = `SELECT COUNT(id) as total FROM article where notice_flag = 0 && top_flag = 0 && casual_note = 1;`

    let callBack2 = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            console.log(data)
            total = data[0].total
            dbConfig.sqlConnect(sql1, sqlArr1, callBack)
        }
    }

    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'page': params.page,
                'pageSize': pageSize,
                'total': total,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql2, sqlArr2, callBack2)

}

//获取书籍分享
getBookShare = (req, res) => {
    let params = {};
    params.page = Number(req.body.page) || 1;
    params.pageSize = Number(req.body.pageSize) || 10;
    let { keyWord } = req.body
    let pageSize = params.pageSize;
    let page = (params.page - 1) * pageSize;

    let sqlArr1 = [page, pageSize];
    let sqlArr2 = [];

    let total = '';

    let sql1 =` select id,title,tags,abstract,pic,tec_share,study_note,casual_note,book_share,user,read_num,com_num,create_time from article where notice_flag = 0 && top_flag = 0 && book_share = 1 Order By create_time Desc limit ?,?;`
    let sql2 = `SELECT COUNT(id) as total FROM article where notice_flag = 0 && top_flag = 0 && book_share = 1;`

    let callBack2 = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            console.log(data)
            total = data[0].total
            dbConfig.sqlConnect(sql1, sqlArr1, callBack)
        }
    }

    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'page': params.page,
                'pageSize': pageSize,
                'total': total,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql2, sqlArr2, callBack2)

}

upload = (req, res) => {
    if (req.file.length === 0) {
        res.render("error", { message: "上传文件不能为空！"})
        return
    } else {
        let file = req.file;
        fs.renameSync('./public/uploads/' + file.filename, './public/uploads/' + file.originalname);
        console.log(file)
        res.set({
            'content-type': 'application/json; charset=utf-8'
        });
        let { link_url, isSave } = req.body
        let img_url = 'http://localhost:3000/uploads/' + file.originalname;
        let sql = 'INSERT INTO banner VALUES (?, ?)'
        let sqlArr = [img_url, link_url];
        console.log(sqlArr)
        if (isSave === 'true'){
            dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
                if (err){
                    console.log(err);
                    throw '出错了'
                } else {
                    if (data.affectedRows == 1){
                        res.send({
                            'code': 200,
                            'msg': '上传成功',
                            'url': img_url
                        })
                    } else {
                        res.send({
                            'code': 400,
                            'msg': '上传失败',
                        })
                    }
                }
            })
        } else {
            console.log('不存储')
            res.send({
                'code': 200,
                'msg': '上传成功',
                'url': img_url
            })
        }

    }
}
//获取banner
getBanner = (req, res) => {
    let sql = "select * from banner";
    let sqlArr = [];
    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'message': '查询成功',
                'data': {
                    'list': data
                }
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {
    getLinks,
    getArticles,
    getDetail,
    getTags,
    getNewRecommend,
    getNotice,
    getTop,
    search,
    getTecShare,
    getStudyNote,
    getCasualNote,
    getBookShare,
    upload,
    getBanner
}
