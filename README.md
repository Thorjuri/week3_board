# week3_board
첫 주특기 주차의 개인 프로젝트.
Node.js 와 express로 구축한 첫 서버이자 첫 백엔드 코드. \
코드 양식이나 수준이 부끄러울만큼 빈약하고 아키텍쳐도 없지만 그저 내가 만든 서버가 실행되고 api가 작동한다는 사실이 \
너무도 신기하고 기뻤다. 빨리 더 많이 배우고 구현하고 싶다.
<hr>

22.10.01
1. schemas에 unique 해제 및 mongodb의 인덱스 삭제. Mongo Server Error: E11000 duplicate key error 오류 해결
2. 모든 기능 정상 구동 확인 완료. 
3. 개인과제 1차 완성 확인.

22.10.03
1. AWS EC2 인스턴스 생성 후, 서버 실행하기 위해 ubuntu에 git clone 하려 했으나, private으로 설정되어 있어서 아이디, 비번 요구함. 
2. 그래서 public으로 변경하려하니, schemas 폴더 내 index에 내 몽고db 개인 url을 넣어놔서 노출 위험 (경고 이메일도 받음) 
3. 어쩔 수 없이 studio 3T 이용하는 local2 27017 db로 다시 재변경함. 
4. 그런데 테스트 해보니 이번에는 index문제가 발생하지 않음 
5. 즉, 내 mongodb 아틀라스 연결해서 index 삭제 작업을 최초 한 번만 진행해주면, 그 이후로는 local27017 연경 후 studio 3T 써도 인덱스 문제 발생하지 않는 것 같음. 
6. 어쨋든 db 주소 변경하고, git push 후 깃헙 public으로 변경함. 
7. 이제 ubuntu에 git clone 하고 서버 실행해 볼 예정 
