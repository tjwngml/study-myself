
// 버튼과 결과창 요소를 변수에 담는다.
const btnGet = document.getElementById('fetch-btn-get');
const btnPost = document.getElementById('fetch-btn-post');
const display = document.getElementById('result-display');




async function createPost() { // 비동기로 함수 작성 - 데이터를 보내는 함수
  const url = 'https://jsonplaceholder.typicode.com/posts';

  // 1. 서버에 보낼 데이터 객체 ( Payload )
  // ** 옵션 객체 안의 body 라는 키의 값으로 포함되어야 서버로 전송됨.
  const newPost = {
    title : '나의 첫 비동기 학습',
    body : 'fetch의 POST 방식을 완벽히 이해했다!',
    userId : 1
  }; 

  // userId, title 등은 내장된 기능이 아닌 서버와의 약속 (프로토콜)이다.
  // 서버가 요구하는 키 이름과 철자 하나라도 틀리면 데이터 전송에 실패할 수 있다.
  // 실무에서는 API 명세서 를 보고 이 이름들을 확인한다.

  try {
    // 2. fetch의 두 번째 인자인 options 설정 
    const response = await fetch(url, {
      // Promise를 반환하므로 await 필요
      method : 'POST', // 요청 방식 설정
      body: JSON.stringify(newPost), // 객체를 문자열(JSON)로 변환 (중요!)
      // ** 옵션 객체의 body 라는 키의 값으로 위에서 정의한 Payload가 문자열 (JSON)으로 변환되어 들어감
      headers : {
        'Content-type' : 'application/json; charset=UTF-8', // 보낼 데이터의 타입 명시

      },
    });

    // 3. 응답 확인
    if (!response.ok) {
      throw new Error("데이터 전송에 실패했습니다.");
    }

    // 4. 서버가 생성해서 보내준 결과 데이터 확인
    const result = await response.json();
    // Promise를 반환하므로 await 필요
    console.log("서버에 등록 성공!");
    console.log("생성된 데이터:",result);
    // 결과값에는 서버가 부여한 id : 101 등이 포함되어 돌아온다.


  } catch(err){
    console.error("에러 발생:",error.message);
  }
}

btnPost.addEventListener('click',createPost);


async function loadData(){
    try {
      display.innerText = "로딩 중..."; // display의 기존 내용을 모두 지우고 해당 텍스트로 교체

      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

      if (!response.ok) throw new Error("데이터를 가져오지 못했습니다.");

      const data = await response.json();

      // 3. 가져온 데이터를 화면에 뿌려준다.
      display.innerText = JSON.stringify(data, null, 2);

    } catch(error) {
        display.innerText = "에러 발생: " + error.message;
    }

  }
  
// 4. 버튼에 '클릭' 사건( Event ) 이 발생하면 loadData 함수를 실행하라고 명령한다.
btnGet.addEventListener('click',loadData);

// createPost();