// 쇼핑몰 배너 JS - 03.페이드효과 //

// loading 후 실행

window.addEventListener("DOMContentLoaded", loadFn);

/**********************************
 * 
 [페이드 효과 슬라이드 기능정의]
 1. 오른쪽 버튼 클릭시 다음 순번슬라이드에 클래스 "on"을 부여해 
 opacity : 1, z-index : 1 로 보이며 맨 위로 설정해준다! (트랜지션 적용)
-> 나머지 li는 모두 "on"을 지워서 초기화

 2. 왼쪽 버튼은 이전 순번이 나오며 위와 동일
 3. 끝번호에 가서는 처음은 마지막으로 
 마지막은 처음으로 슬라이드가 다시 반복된다.
 4. 블릿은 현재 슬라이드와 일치된 순번표시
**********************************/
/**********************************

함수명 :loadFn
기능: 로딩 후 이벤트 설정 및 슬라이드 기능

**********************************/

function loadFn() {
  // 1. 호출확인
  console.log("loaded!");
  // 2. 전체 슬라이드 번호 순번변수
  let sno = 0; // 첫 슬라이드 번호

  // 3. 변경대상 설정하기
  // (1) 슬라이드 박스 li (#slide li)
  const slide = document.querySelectorAll("#slide li");
  // console.log("슬라이드", slide);

  // (2) 블릿박스 li
  const indic = document.querySelectorAll(".indic li");

  // 4. 이동버튼에 클릭 이벤트 설정하기.
  //이동버튼요소
  const abtn = document.querySelectorAll(".abtn");
  // console.log(abtn);

  // 5. 광클금지용 변수
  let prot = 0; // 0-허용, 1-금지

  for (let x of abtn) {
    //x는 a요소 자신
    x.onclick = () => {
      ///////// 광클금지 /////////
      if (prot) return false; //돌아가!
      prot = 1; // 잠금!
      setTimeout(() => (prot = 0), 410);
      // 타임아웃으로 슬라이드 이동 후
      // 잠금설정을 prot= 0으로 해제
      //////////////////////////////////

      //1. 오른쪽버튼 여부
      let isR = x.classList.contains("ab2");
      console.log(".ab2인가?", isR);

      // 2. 오른쪽/왼쪽 분기하기
      if (isR) {
        // 오른쪽 버튼
        // 슬라이드 번호 증가
        sno++;
        if (sno === 5) sno = 0;
      } else {
        sno--;
        if (sno === -1) sno = 4;
        //왼쪽버튼
      } /////////// else /////////
      console.log("슬번", sno);
      //3.초기화
      for (let y of slide) y.classList.remove("on");
      //4.해당순번에 class= "on"
      slide[sno].classList.add("on");

      //5. 블릿 초기화 /////
      for (let z of indic) z.classList.remove("on");

      // 6. 해당순번 블릿 li에 class = "on"
      indic[sno].classList.add("on");
      return false;
    }; /////click ////////
  } /////////for of //////////////
} /////////////////// loadFn 함수/////////////////
