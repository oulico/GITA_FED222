// 도깨비 PJ 공통 JS /////

/*********************
 함수명 : showGNB
 기능 : GNB 메뉴를 보였다 숨기기 위해 
 미리 셋팅된 .on을 .top에 넣고/뺌
**********************/

function showGNB() {
  console.log("clickedHam");

  var target = document.querySelector(".top");

  target.classList.toggle("on");
  /*******************************
  [클래스 넣기/빼기 객체]
  classList
  1) add(클래스명) -> 클래스넣기
  2) remove(클래스명) -> 클래스빼기
  3) toggle(클래스명) -> 존재여부로 클래스 변경
  
   *******************************/
}
