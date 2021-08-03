const express = require('express');
const { joinValidator, loginValidator } = require("../middleware/member");
const { alert } = require("../lib/common");
const member = require('../models/member');
const router = express.Router();

// 회원가입
router.route("/join")
    .get((req, res) => {
        return res.render("member/join");
    })
    .post(joinValidator, async (req, res) => {
        const result = await member.join(req.body);
        if (result) {
            // 가입 성공 > 로그인 페이지로 이동
            return res.redirect("/member/login");
        }
        // 가입 실패 > 메세지, 다시 회원 가입 양식으로
        return alert('회원 가입 실패하였습니다', res, true);
    });

// 로그인
router.route("/login")
    .get((req, res) => {
        return res.render("member/login");
    })
    .post(loginValidator, async (req, res) => {
        const result = await member.login(req.body.memId, req.body.memPw, req);
        if (result) {
            return res.redirect("/");
        }

        return alert("로그인에 실패하였습니다.", res, true);
    });

// 로그아웃
router.get("/logout", (req, res) => {
    // 세션 전체 비우기 > 로그 아웃
    req.session.destroy();
    // 로그아웃 되면 메인페이지로 이동
    return res.redirect("/");
});

module.exports = router;