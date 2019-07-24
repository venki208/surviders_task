# surviders_task

clone repo using `git clone git@github.com:venki208/surviders_task.git`

make sure 
  `python3.6.6`, `angular7`, `mongodb` are installed
  
 create `project` database in mongo by using following command
 go to inside mongo then run `use project`
  
  


<b>Django</b>

create virtual environment and activate the environment
go to `backend` folder then install using pip install requirements by following command
`pip install -r requirements.txt`

once both are installed go to `backend` directory
run `python manage.py check` --> this should give result `no issues found`

load the data from file by following command
`python manage.py load_mongo_data <filepath>`

then run the django server by using following command
`python manage.py runserver`


<b>frontend(Angular 7)</b>
go to `frontend` folder then install libreries by following command
`npm install` --> installes the all node modules

then run server `ng serve` 

hit the angular url which will provide after run the server for angular.

once page loaded click the link "Go To UserList" => data will load
  
