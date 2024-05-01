const express = require('express');
const app = express();
const path = require('path');

// 정적 파일 제공 폴더 설정
app.use('/static', express.static(path.join(__dirname, 'C:', 'tbsc', 'file')));

// 공지사항 목록을 반환하는 라우트 설정
app.get('/notices', (req, res) => {
    // 여기에 공지사항 목록을 조회하고 반환하는 로직을 추가합니다.
    res.send('공지사항 목록을 반환합니다.');
});

// 특정 공지사항의 상세 정보를 반환하는 라우트 설정
app.get('/notices/:num', (req, res) => {
    const num = req.params.num;
    // 여기에 해당 번호의 공지사항 상세 정보를 조회하고 반환하는 로직을 추가합니다.
    res.send(`번호가 ${num}인 공지사항의 상세 정보를 반환합니다.`);
});

// 새로운 공지사항을 생성하는 라우트 설정
app.post('/notices/create', (req, res) => {
    // 여기에 새로운 공지사항을 생성하는 로직을 추가합니다.
    res.send('새로운 공지사항을 생성합니다.');
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
