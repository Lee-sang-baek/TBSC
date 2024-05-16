import * as XLSX from 'xlsx';

export const exportToExcel = (data, filename) => {
  // 데이터 배열을 가공하여 엑셀에 쓸 형태로 변환합니다.
  const excelData = data.map(item => {
    // 만약 member가 없는 경우 빈 문자열을 반환합니다.
    const memberId = item.member ? item.member.id : '비회원';

    // 반환할 객체를 생성합니다.
    return {
      번호: item.num,
      'IP 주소': item.ipAddress,
      아이디: memberId,
      '접속 메뉴': item.path,
      '접속 시간': item.time
    };
  });

  // 데이터 배열을 시트 데이터로 변환합니다.
  const sheet = XLSX.utils.json_to_sheet(excelData);

  // 워크북을 생성하고 시트를 추가합니다.
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, sheet, 'Sheet1');

  // 엑셀 파일을 저장합니다.
  XLSX.writeFile(wb, `${filename}.xlsx`);
};
