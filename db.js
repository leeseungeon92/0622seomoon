const mysql = require('mysql');

const connection = mysql.createConnection({
    host :'us-cdbr-east-05.cleardb.net',
    user :'b8af711059e047',
    password :'96d7a8099',
    port : 3306,
    database : 'heroku_b6d25066b6ef691',
    dateStrings : 'date' //날짜 시간 출력 
})

//리스트 전체를 불러오는 방법
function getAllMemos(callback){
    connection.query('select * from notice_admin ORDER BY id DESC', (err,rows,fields) => {
        if(err) throw err;
        callback(rows);
    });
}

//리스트에 새로운 내용을 추가하는 함수
function insertMemo(re_title, callback){
    connection.query(`INSERT INTO notice_admin(content, create_time, update_time) VALUES
    ('${re_title}',NOW(),NOW())`,(err,result) => {
        if (err) throw err;
        callback();
    })
}

//리스트 중 id값이 일치하는 row만 불러오는 함수
function getMemoById(id, callback){
    connection.query(`select * from notice_admin WHERE ID = '${id}'`, (err,row,fields) => {
        if (err) throw err;
        callback(row);
    })
}

//리스트를 수정하고 싶을때 id값이 일치하는 부분을 수정하는 함수
function updateMemoById(id, content, callback){
    connection.query(`UPDATE NOTICE_ADMIN SET CONTENT = '${content}', update_time = NOW() WHERE id = '${id}'`,(err, result)=>{
        if (err) throw err;
        callback();
    })
}

//리스트 중 id값이 일치하는 부분을 삭제하는 함수
function deleteMemoById(id, callback){
    connection.query(`DELETE from notice_admin WHERE id ='${id}'`, (err, result) => {
        if (err) throw err;
        callback();
    })
}

module.exports = {
    getAllMemos,
    insertMemo,
    getMemoById,
    deleteMemoById,
    updateMemoById,
}