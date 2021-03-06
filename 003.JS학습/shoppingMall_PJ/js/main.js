// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

// HTML태그 로딩 후 loadFn 함수 호출!ㅓㅓ
window.addEventListener("DOMContentLoaded", loadFn);

/****************************************

  [ 슬라이드 이동 기능정의 ]
  1. 이벤트 종류 : click
  2. 이벤트 대상: 이동버튼(.abtn)
  3. 변경대상: 슬라이드 박스(#slide)
  4. 기능설계: 
    (1) 오른쪽 버튼 클릭시 다음 슬라이드가 나타나도록 슬라이드 박스의 left값을 -100%로 변경시킨다.
        
        -> 슬라이드 이동후에 나가있는 첫번째 슬라이드
        li를 잘라서 맨뒤로 보낸다!
        동시에 left값을 0으로 변경한다. 

    (2) 왼쪽 버튼 클릭시 이전 슬라이드가 나타나도록 하기위해 
        우선 맨 뒤 li를 맨 앞으로 이동하고 동시에 left값을 -100%로 변경한다.
        그 후 left값을 0으로 애니메이션하여 슬라이드가 왼쪽에서 들어온다.

    (3) 공통기능: 슬라이드 위치표시 블릿
    - 블릿대상: .indic li 
    - 변경내용 : 슬라이드 순번과 같은 순번의 li에 클래스 on을 부여하기
    (나머지는 빼기 -> 초기화)
    - 

****************************************/

/***************************************
  함수명: loadFn
  기능: 로딩 후 버튼 이벤트 및 기능구현
***************************************/
function loadFn() {
  //1. 호출확인
  console.log("로딩완료");

  // 변경대상 설정하기
  const slide = document.querySelector("#slide");

  // 블릿박스 li

  const indic = document.querySelectorAll(".indic li");
  // console.log("블릿", indic);
  // 2.5 변경대상 li에 순번 속성넣기
  // 넣는 이유 : li가 이동하여 순서가 바뀌므로
  // 블릿버튼 순번을 표시할 때 고유한 순서번호가 필요함
  // 내가 만드는 속성은 반드시 "data-"로 시작하도록 w3c에서 정함
  // 순번속성명은 data-seq로 하기로 함
  let setSeq = slide.querySelectorAll("li");
  // for(시;한;증){
  for (let i = 0; i < setSeq.length; i++) {
    setSeq[i].setAttribute("data-seq", i);
    // 각 li마다 새로운 속성인 "data-seq"에
    // 순서대로 0부터 값을 넣어준다.
  } //////////////// for ////////////

  //2. 이동버튼에 클릭 이벤트 설정하기.
  //이동버튼요소
  const abtn = document.querySelectorAll(".abtn");
  // console.log(abtn);

  // 광클금지용 변수
  let prot = 0; // 0-허용, 1-금지

  for (let x of abtn) {
    //x는 a요소 자신
    x.onclick = () => {
      ///////// 광클금지 /////////
      if (prot) return; //돌아가!
      prot = 1; // 잠금!
      setTimeout(() => (prot = 0), 410);
      // 타임아웃으로 슬라이드 이동 후
      // 잠금설정을 prot= 0으로 해제
      //////////////////////////////////

      //1. 오른쪽버튼 여부
      let isR = x.classList.contains("ab2");

      // 2. 오른쪽/왼쪽 분기하기
      if (isR) {
        slide.style.left = "-100%";
        slide.style.transition = "left .4s ease-out";
        // 이동후 실행 이동시간은 .4초
        // setTimeout(함수, 시간) -> 일정시간 후 한번 실행하기
        setTimeout(() => {
          //2. 맨 처음 슬라이드를 맨 뒤로 보내기
          // 첫번째 li
          let fli = slide.querySelectorAll("li")[0];
          slide.appendChild(fli);
          //3. 동시에 left값 0
          slide.style.left = "0";
          // 이 때 트랜지션 해제!
          slide.style.transition = "none";
        }, 400); ////////// 타임아웃 //////////

        // classList.contains(클래스명)
        // -> 지정클래스가 있으면 true리턴
        console.log("이건 오른쪽이다");
      } else {
        // 1. 맨뒤 li 맨앞으로 이동
        // li들
        let lis = slide.querySelectorAll("li");
        //insertBefore(넣을놈, 넣을놈뒷놈)
        //insertNefor(맨뒤li, 맨앞li)
        slide.insertBefore(lis[lis.length - 1], lis[0]);
        // lis[lis.length -1 ] 맨뒤 li -> lis[개수 - 1]

        // 2. 동시에 left:-100% + 트랜지션없앰
        slide.style.left = "-100%";
        slide.style.transition = "none";

        //위의 이동소스와 약간의 시차가 필요하다.(async await 쓰면 안되나?)

        // 3. 0.01초 기다렸다가 실행
        setTimeout(() => {
          slide.style.left = "0";
          slide.style.transition = "left .4s ease-out";
        }, 10);
        console.log("이건 왼쪽이다");
      } /////////// else /////////

      // 4. 공통기능: 블릿변경하기
      // 블릿 class="on" 지우기 초기화
      for (let x of indic) x.classList.remove("on");

      // 첫번째 슬라이드 "data-seq"값을
      // 읽어와서 블릿 순번에 적용하기
      // 주의 오른쪽 버튼은 [1] 왼쪽 버튼은 [0]
      // 즉, 오른쪽은 두번재 li, 왼쪽은 첫번째 li
      // 오른쪽 버튼이면 isR 변수 값이 true
      //isR?1:0 -> 비? 집: 놀이동산 (조건 연산자 == 삼항연산자)
      //isR값이 true이면 1, 아니면 0

      let fseq = slide
        .querySelectorAll("li")
        [isR ? 1 : 0].getAttribute("data-seq");

      // getAttribute(속성명) -> 속성값을 읽어온다.
      console.log("fseq값", fseq);
      console.log("fseq값의 형:", typeof fseq);

      indic[fseq].classList.add("on");
      //원래는 fseq는 숫자값인데 숫자형이어야 함
      // 그래서 Number(fseq)로 형변환 해야했었음
      //그런데 요즘 브라우저에서는 이런 부분을 처리해준다.
      // 형변환하지 않아도 숫자이면 숫자형으로 변환해준다.
      return false;
    }; /////click ////////
  } /////////for of //////////////
} /////////// loadFn 함수 ///////////////
