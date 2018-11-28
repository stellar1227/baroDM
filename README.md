# 바로 DM UI guide

## folder

### highlight
- 실 서버 배포 안함  usage 위함 

### css
- scss에서 compile된 CSS (직접사용되는 파일)
- barodm.css 에 통합
- natural.ui.css


### design 
- html 페이지 템플릿
- styleGuide.html 에 컴포넌트 예시
- include.html 에 레이아웃 및 header/footer , CSS , js 링크 순서 규격

### fonts 
- font파일 notoSansKR

### js
- lib : jQuery, natural.js, bxslide.min.js
- barodm.ui.js (ui에서 사용될 js)

### images
- common : 공통 
- temp : 더미 
- contents : sub contents

### scss 
- 실 서버 배포 안함
- variable, function, fonts, reset, barodm.scss (컴파일 시 barodm.css로 통합)

### index.html
- IA 기반 화면 리스트
- row 클릭시 새 창으로 템플릿 뜸
- 진척도 및 description 표기