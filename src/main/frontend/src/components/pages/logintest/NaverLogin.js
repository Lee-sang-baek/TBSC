import React, { useEffect } from 'react';

const NaverLogin = () => {
  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'YOUR_NAVER_CLIENT_ID',
      callbackUrl: 'http://localhost:3000/login/naver',
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 48 },
      callbackHandle: true,
    });
    naverLogin.init();

    window.addEventListener('load', function () {
      naverLogin.getLoginStatus(function (status) {
        if (status) {
          console.log(naverLogin.user);
        } else {
          console.log('네이버 로그인 실패');
        }
      });
    });
  }, []);

  return (
    <div id="naverIdLogin" />
  );
};

export default NaverLogin;
