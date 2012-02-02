#curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d ' {"user":{"first_name":"firstname","last_name":"lastname","email":"email@email.com","password":"app123","password_confirmation":"app123"}}'  http://localhost:3000/api/1/users
#DATA='{"code":" \n  main() {\n      print('hello world');\n  }\n  "}'
curl -v -H "Accept: application/json" -H "Content-type: application/json" -X POST -d @testData http://127.0.0.1:8888/dartExec
