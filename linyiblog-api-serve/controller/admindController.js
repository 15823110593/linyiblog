var dbConfig = require('../util/dbconfig')
let fs = require('fs');

//新增文章
addArticle = (req, res) => {
    let { title, abstract, tags, pic, content, user, read_num, com_num, create_time, notice_flag, top_flag, tec_share, study_note, casual_note, book_share} = req.body
    console.log(req.body)

    let sql = "insert into article (title,abstract,tags,pic,content,user,read_num,com_num,create_time,notice_flag,top_flag,tec_share,study_note,casual_note,book_share) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let sqlArr = [title, abstract, tags, pic, content, user, read_num, com_num, create_time, notice_flag, top_flag, tec_share, study_note, casual_note, book_share];
    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'code': 200,
                'message': '新增成功',
            })
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callBack)

    let tagList = req.body.tags.split(',')
    console.log(tagList)
    tagList.forEach(item => {
        let sql2 = `select * from tags where name=?`
        let sqlArr2 = [item]
        dbConfig.sqlConnect(sql2, sqlArr2, function (err, data) {
            console.log(data)
            if (data.length==0){
                let sql3 = `insert into tags(name, num) values (?,?)`
                let sqlArr3 = [item, 1]
                dbConfig.sqlConnect(sql3, sqlArr3, function (err, data) {
                    if (err){
                        console.log('连接出错了')
                    } else {
                        console.log('tag新增成功')
                    }
                })
            } else {
                let num = data[0].num +=1
                let sql4 = `UPDATE tags SET num = ? WHERE name = ?`
                let sqlArr4 = [num, item]
                dbConfig.sqlConnect(sql4, sqlArr4, function (err, data) {
                    if (err){
                        console.log('连接出错了')
                    } else {
                        console.log('tag数量修改成功')
                    }
                })
            }
        })
    })
}
module.exports = {
    addArticle,
}
