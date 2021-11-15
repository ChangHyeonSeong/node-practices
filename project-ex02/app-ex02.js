/*
douzone-bipa-math npm 모듈 테스트(모듈 패키지: 로컬 배포)

$ npm i ../douzone-bipa-math
명령으로 설치 후 테스트 할 것

*/



var dzmath = require('douzone-bipa-math');

console.log(dzmath.sum(10, 20, 30, 40, 50));
console.log(dzmath.max(10, 20, 30, 40, 50));
console.log(dzmath.min(10, 20, 30, 40, 50));