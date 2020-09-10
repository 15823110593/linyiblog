var dbConfig = require('../util/dbconfig')

//获取分类
getCate = (req, res) => {

    let sql = "select * from cate";
    let sqlArr = [];
    let callBack = (err, data) => {
        if (err){
            console.log('连接出错了')
        } else {
            res.send({
                'list': data
            })
        }
    }

    dbConfig.sqlConnect(sql, sqlArr, callBack)
}
module.exports = {
    getCate
}
