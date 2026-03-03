# 학생 관리 시스템: 아르보

## 기획 의도

### PDF 파일 생성

- 최초 구상: react-pdf/renderer를 이용해 data -> pdf component -> blob -> open in new tab
- 과도한 자원 소모: 공식 문서 - pdf 30 페이지 이상을 생성할 땐 web worker를 써라
    - pdf를 만드는 것이 브라우저에 종속될 필요가 없음
- 개선안:
    - server에서 client가 보낸 데이터로 typst 파일 생성
    - typst compile to pdf
    - respond with pdf blob
    - client open new tab with blob
