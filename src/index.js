import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*
    <StrictMode>와 </StrictMode> 사이에 react 컴포넌트를 작성하면, 
    오류 검사하기 위해 렌더링 단계에서 의도적으로 함수를 두 번 호출한다고 한다.
  */

  <React.StrictMode>
    {/* BrowserRouter 브라우저의 주소 변경을 감지하는 기능 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


