// CGV main 페이지 js - main.js //

/**************************************** 
   함수명: chgMV
   기능: 영화 예고편 선택하여 플레이하기 

****************************************/
function chgMV(vid) {
  //vid - 동영상id

  // 1. 함수 호출 확인 + 전달값 확인
  console.log("바꿔", vid);
  // 2. 변경 대상 선정
  var tg = document.querySelector("#screen iframe");

  // 3. 변경내용: src 속성 재설정하기
  // 선택요소.src = 변경할 값
  tg.src = `https://www.youtube.com/embed/${vid}?autoplay=1&loop=1&playlist=${vid}&playsinline=1`;
} // chgMV 함수 //
