const express = require("express");
const models = require("../models");
const router = express.Router();
const Op = models.Op;
//데이터 전체 조회
router.get("/show", function(req, res, next) {
  models.board_crud
    .findAll({
      offset:0,
      limit: 10,
      order: [
        ['number' , 'DESC']
      ]
    })
    .then(function(result) {
      res.send(result);
    });
});

// 글쓰기
router.post("/write", function(req, res, next) {
  const body = req.body;
  const date = new Date();
  models.board_crud
    .create({
      title: body.title,
      name: body.name,
      content: body.content,
      write_date: date
    })
    .then(function(result) {
      console.log("데이터 추가 완료");
      res.json(result);
    })
    .catch(function(err) {
      console.log("데이터 추가 실패");
    });
});
//데이터 개인 조회
router.get("/show/:number", function(req, res, next) {
  const postNumber = req.params.number;

  models.board_crud
    .findAll({
      where: { number: postNumber }
    })
    .then(result => {
      console.log("데이터 조회 성공");
      res.json(result);
    })
    .catch(err => {
      console.log("데이터 조회 실패");
      res.json(result);
    });
});

//데이터 수정
router.put("/edit/:number", function(req, res, next) {
  const postNumber = req.params.number;
  const body = req.body;

  models.board_crud
    .update(
      {
        title: body.title,
        name: body.name,
        content: body.content,
        write_date: body.write_date
      },
      {
        where: { number: postNumber }
      }
    )
    .then(result => {
      console.log("데이터 수정 완료");
      res.json(result);
    })
    .catch(err => {
      console.log("데이터 수정 실패");
      res.json(result);
    });
});
//데이터 삭제
router.delete("/delete/:number", function(req, res, next) {
  const postNumber = req.params.number;

  models.board_crud
    .destroy({
      where: { number: postNumber }
    })
    .then(result => {
      console.log("데이터 삭제 완료");
      res.json(result);
    })
    .catch(err => {
      console.log("데이터 삭제 실패");
      res.json(result);
    });
});

//원글에 답글 달때
router.post("/write/:number/:reply", function(req, res, next) {
  const body = req.body;

  models.board_crud
    .create({
      title: body.title,
      name: body.name,
      content: body.content,
      write_date: body.write_date
    })
    .then(function(result) {
      console.log("데이터 추가 완료");
      res.json(result);
    })
    .catch(function(err) {
      console.log("데이터 추가 실패");
      res.json(result);
    });
});

//답글에 답글 달때
router.post("/write/:number/:reply", function(req, res, next) {
  const body = req.body;

  models.board_crud
    .create({
      //number:, 자동으로 숫자 올라감
      title: body.title,
      name: body.name,
      content: body.content,
      write_date: body.write_date
    })
    .then(function(result) {
      console.log("데이터 추가 완료");
      res.json(result);
    })
    .catch(function(err) {
      console.log("데이터 추가 실패");
      res.json(result);
    });
});
//댓글 달때
router.post("/reply/:number", function(req, res, next) {
  let postNumber = req.params.number;
  let boardID = req.params.board_id;
  let body = req.body;
  const date = new Date();
  models.reply
    .create({
      board_id: boardID,
      name: body.name,
      content: body.content,
      write_date: date
    },{ 
        where: { number: postNumber }
      }
    )
    .then(results => {
      res.json(result);
    })
    .catch(err => {
      console.log("데이터 추가 실패");
      res.json(result);
    });
});

module.exports = router;
