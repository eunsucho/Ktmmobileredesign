// 페이지 목록 — 새 페이지 추가 시 여기만 수정
const NAV_PAGES = [
  { file: 'standalone_main_v3_민이.html', label: '홈',            nav: null },
  { file: 'SIM 활성화 가이드.html',        label: 'SIM 활성화 가이드', nav: '고객센터' },
  { file: '../요금제소개-v3.html',        label: '요금제 소개',    nav: '상품' },
  { file: '요금제비교.html',              label: '요금제 비교',    nav: '상품' },    // 추후 추가
  { file: '셀프개통.html',               label: '셀프개통',       nav: '가입하기' }, // 추후 추가
];

// 현재 파일명으로 활성 페이지 찾기
function getCurrentPage() {
  const parts = location.pathname.split('/');
  return parts[parts.length - 1] || parts[parts.length - 2];
}

// 홈(메인) 파일 경로 반환
function getHomeHref() {
  return NAV_PAGES[0].file;
}
