var express = require('express');
var router = express.Router();

const {check, validationResult} = require('express-validator')

const db = require('./../db.js');

// 페이지 연결
router.get('/', function(req, res, next) {

    db.getAllMemos((rows) => {
        res.render('notice_main',{rows : rows})
    }
    
)
    //res.send('test');

})
//page move
router.get('/notice_write', function(req, res, next){
    res.render('notice_write')
})

router.post('/notice_write', 
    [check('notice_title').isLength({min: 1, max:100})],
    function(req,res, next){
    let errs = validationResult(req);
    console.log(errs); //콘솔 에러 출력하기
    if(errs['errors'].length > 0){ //화면 에러 출력하기
        res.render('notice_write',{errs:errs['errors']});
    } else{
        let param = JSON.parse(JSON.stringify(req.body));
        let re_title = param['notice_title'] //db에 던져주기위해서 json의 형태로 만들어줌.
        let inner_content = param['inner_content']
        db.insertMemo(re_title, inner_content, () => {
            res.redirect('/');
        });
}
    });


router.get('/notice_edit', (req,res) => {
    let id = req.query.id;

    db.getMemoById(id, (row) => {
        if (typeof id == 'undefined' || row.length <= 0) {
            res.status(404).json({error:'undefined memo'});
        } else{
                res.render('notice_edit', {row : row[0] });
        }
    })
})

router.post('/store',
    [check('content').isLength({min: 1, max:300})],
    (req,res) => {
        let errs = validationResult(req);
        let param = JSON.parse(JSON.stringify(req.body));
        let id = param['id'];
        let content = param['content'];
        let inner_content = param['inner_content'];

        if (errs['errors'].length>0){

            db.getMemoById(id, (row) => {
                res.render('notice_edit',{row:row[0],errs : errs['errors']})
            });
        } else{
            db.updateMemoById(id, content, inner_content, () => {
                res.redirect('/');
            })
        }
});

router.get('/notice_content', (req,res) => {
    let id = req.query.id;

    db.getMemoById(id, (row) => {
        if (typeof id == 'undefined' || row.length <= 0) {
            res.status(404).json({error:'undefined memo'});
        } else{
                res.render('notice_content', {row : row[0] });
        }
    })
})

router.get('/notice_delete', (req,res) => {
    let id = req.query.id;
    db.deleteMemoById(id,() => {
        res.redirect('/');
    });
});

//공지사항 컨텐츠 페이지로 이동
router.get('/notice_content', function(req, res, next){
    res.render('notice_content')
})

//공지사항 컨텐츠 페이지 수정로 이동
router.get('/notice_edit', function(req, res, next){
    res.render('notice_edit')
})


//수정버튼을 눌렀을때 나오는 하는 화면 함수 
router.get('/notice_edit', (req,res) => {
    let id = req.query.id;

    db.getMemoById(id, (row) => {
        if (typeof id == 'undefined' || row.length <= 0) {
            res.status(404).json({error:'undefined memo'});
        } else{
                res.render('notice_edit', {row : row[0] });
        }
    })
})

//////////////////////////////
router.post('/store',
    [check('content').isLength({min: 1, max:300})],
    (req,res) => {
        let errs = validationResult(req);
        let param = JSON.parse(JSON.stringify(req.body));
        let id = param['id'];
        let content = param['content'];
        let inner_content = param['inner_content'];

        if (errs['errors'].length>0){

            db.getMemoById(id, (row) => {
                res.render('notice_edit',{row:row[0],errs : errs['errors']})
            });
        } else{
            db.updateMemoById(id, content, inner_content, () => {
                res.redirect('/');
            })
        }
});


module.exports = router;