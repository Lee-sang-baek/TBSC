import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NaverLogin from './NaverLogin';

const social = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login/naver" component={NaverLogin} />
        {/* 추가 라우팅 */}
      </Switch>
    </Router>
  );
};

export default social;
