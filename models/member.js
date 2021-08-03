const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const member = {
    // 회원 가입 처리
    // @ param data
    join : async function(data) {
        try {
            delete data.memPwRe;

            // 비밀번호 해시 처리
            data.memPw = await bcrypt.hash(data.memPw, 10);

            const filePath = path.join(__dirname, "../data/member", data.memId + ".json");
            await fs.writeFile(filePath, JSON.stringify(data));

            return true;
        } catch(err) {
            // 회원 가입 실패
            return false;
        }
    },

    // 로그인 처리
    // req 인수가 추가된 이유 > 로그인 아이디와 비번이 일치하는 경우 세션에 회원 아이디를 저장하기 위한 용도
    login : function(memId, memPw, req) {
        // 1. memId로 회원 정보
        // 2. 회원정보에 있는 비밀번호 해시와 memPw의 일치 여부 체크
        // 3. 일치하는 경우> req.session에 하위 속성으로 memId에 값을 대입
        // 4. 공통 미들웨어 > 초기화 담당 미들웨어를 추가해서 로그인 데이터 전역 유지 ( 공통 미들웨어는 세션 미들웨어가 등록된 이후에 추가 해야 정상적으로 세션 데이터를 확인 가능)
    }
};

module.exports = member;