import React, { useState, useEffect } from 'react';
import './Popup.css'; // 팝업 창의 스타일을 포함한 CSS 파일

const Popup = ({ item, setRandomPositionNearCenter }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const lastCloseTime = localStorage.getItem(`popupClosedTime_${item.num}`);
    if (lastCloseTime) {
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;
      if (now - lastCloseTime < oneDay) {
        setVisible(false);
      }
    }
  }, [item.num]);

  const handleCloseForADay  = () => {
    localStorage.setItem(`popupClosedTime_${item.num}`, new Date().getTime());
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };


  const [popupStyle, setPopupStyle] = useState({});

  useEffect(() => {
    const position = setRandomPositionNearCenter();
    setPopupStyle(position);
  }, [setRandomPositionNearCenter]);

  if (!visible) {
    return null;
  }

  return (
    <div className="Popup-compo" style={popupStyle}>
        
        <img src={`/uploads/${item.image}`} alt={item.image} />
      
      <div className='btn'>
        <div onClick={handleCloseForADay} className='left'>
          <input type='checkbox'/>하루 동안 보이지 않기
        </div>
        <div onClick={handleClose} className='right'>닫기</div>
      </div>
    </div>
  );
};

export default Popup;