import React from 'react';
import "./ReserveForm.css";
import { Link, useParams } from 'react-router-dom';

const ReserveForm = () => {
  const { type } = useParams();

  const consultants = {
    title: '컨설팅 신청 방법',
    steps: [
      '예약 신청서 작성하기', '→',
      '신청서 제출', '→',
      '예약 확정 알림',
    ],
    inquiryTitle: '컨설팅 문의 및 신청',
    operatingHours: [
      '운영시간: 09:00 ~ 18:00 (주말/공휴일 제외)',
      '12:00 ~ 13:00 점심시간',
      '문의: 062-367-0644',
    ],
    categories: [
      '창업: 사업계획서 작성 / BM 수립 및 점검',
      '투자: 투자연계 / 정부지원',
      '경영 심화: 인사·노무 / 재무회계 / 법무·특허 / 경영관리·ESG',
      '홍보·마케팅: 상품·컨텐츠·디자인 기획',
    ],
    notes: [
      '상담 예약 신청은 상담일 3일 전까지 가능합니다. (신청 당일 진행 불가)',
      '신청자(기업)의 지원 자격에 따라 예약 신청이 반려될 수 있습니다.',
      '예약 신청 시간을 꼭 준수하여 주시기 바랍니다.',
      '예약 신청서에 작성한 컨설팅 일자는 신청자(기업)의 희망 시간이며, 담당자 승인 완료 후 컨설팅 일정이 최종 확정됩니다.',
      '신청 서류 접수: 이메일 접수 (gjtourbiz@gjto.or.kr)',
    ],
  };

  const jobConsult = {
    title: '일자리 상담 신청 방법',
    steps: [
      '예약 신청서 작성하기', '→',
      '신청서 제출', '→',
      '예약 확정 알림',
    ],
    inquiryTitle: '일자리 상담 문의 및 신청',
    operatingHours: [
      '운영시간: 09:00 ~ 18:00 (주말/공휴일 제외)',
      '12:00 ~ 13:00 점심시간',
      '문의: 062-367-0644',
    ],
    categories: [],
    notes: [
      '상담 예약 신청은 상담일 3일 전까지 가능합니다. (신청 당일 진행 불가)',
      '신청자(기업)의 지원 자격에 따라 예약 신청이 반려될 수 있습니다.',
      '예약 신청 시간을 꼭 준수하여 주시기 바랍니다.',
      '예약 신청서에 작성한 상담 일자는 신청자(기업)의 희망 시간이며, 담당자 승인 완료 후 상담 일정이 최종 확정됩니다.',
      '신청 서류 접수: 이메일 접수 (gjtourbiz@gjto.or.kr)',
    ],
  };

  const rental = {
    title: '시설 대관 신청 방법',
    steps: [
      '예약 신청서 작성하기', '→',
      '신청서 제출', '→',
      '예약 확정 알림',
    ],
    inquiryTitle: '대관 문의 및 신청',
    operatingHours: [
      '대관시간: 09:00 ~ 18:00 (주말/공휴일 제외)',
      '12:00 ~ 13:00 점심시간',
      '대관 예약: 최소 7일 전 신청',
      '당일 예약: 불가',
      '문의: 광주관광기업지원센터 062-367-0644',
    ],
    categories: [],
    notes: [
      '인원수와 목적에 맞는 회의실 사용을 권고드립니다.',
      '회의실 내 음식물 반입 및 취식은 금지되어 있습니다.',
      '회의실 사용 후 뒷정리 및 기본가구 셋팅 원상복구 부탁드립니다.',
      '센터 행사 및 내부사정 등으로 인해 대관신청이 반려될 수 있습니다.',
      '관광기업, 관광 관련 분야 목적이 아닐 경우 반려될 수 있습니다.',
      '신청 서류 접수: 이메일 접수 (gjtourbiz@gjto.or.kr)',
    ],
  };

  const content = type === 'consultants' ? consultants :
                  type === 'jobConsult' ? jobConsult :
                  type === 'rental' ? rental : null;

  const link = type === 'consultants' ? '/consultants' :
                type === 'jobConsult' ? '/jobConsult' :
                type === 'rental' ? '/rental' : null;

  if (!content) {
    return (
        <div className='ReserveForm-compo'>
            <h1>잘못된 유형입니다.</h1>
        </div>
    );
  }

  return (
    <div className='ReserveForm-compo'>
      <div className="how-to-apply">
        <h2>{content.title}</h2>
        <div className='list'>
          {content.steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      </div>
      <div className="consulting-inquiry">
        <h2>{content.inquiryTitle}</h2>
        <div className='inquirys'>
          <div className='up'>
            <h3>운영 안내</h3>
            <div className='explain'>
              {content.operatingHours.map((hour, index) => (
                <p key={index}>{hour}</p>
              ))}
            </div>
          </div>
          {content.categories.length > 0 && (
            <div className='up'>
              <h3>컨설팅 분야</h3>
              <div className='category'>
                {content.categories.map((category, index) => (
                  <p key={index}>{category}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="notes">
        <h2>유의사항</h2>
        <div className='in-notes'>
          {content.notes.map((note, index) => (
            <p key={index}>{note}</p>
          ))}
        </div>
        <div className='btn'>
          <Link to={link}>
            <button type='button'>
              신청 페이지
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReserveForm;
