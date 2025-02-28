@echo off
set BASE_URL=http://localhost:8080/tasks

:: 1. Create a Task (POST)
echo Creating a task...
curl -s -X POST "%BASE_URL%" ^
  -H "Content-Type: application/json" ^
  -d "{\"id\": \"task-1\", \"name\": \"Test Task\", \"owner\": \"John Doe\", \"command\": \"echo Hello World\"}" > create_response.json
set /p CREATE_RESPONSE=<create_response.json
echo Create Response: %CREATE_RESPONSE%
for /f "tokens=*" %%i in ('jq -r .id create_response.json') do set TASK_ID=%%i

:: 2. Get All Tasks (GET)
echo Fetching all tasks...
curl -s -X GET "%BASE_URL%" | jq

:: 3. Get Task by ID (GET)
echo Fetching task by ID: %TASK_ID%...
curl -s -X GET "%BASE_URL%?id=%TASK_ID%" | jq

:: 4. Search Tasks by Name (GET)
echo Searching tasks by name...
curl -s -X GET "%BASE_URL%/search?name=Test" | jq

:: 5. Execute a Task (POST)
echo Executing task...
curl -s -X POST "%BASE_URL%/%TASK_ID%/execute" | jq

