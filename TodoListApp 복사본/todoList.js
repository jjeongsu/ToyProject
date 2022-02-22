const todoForm = document.querySelector("#todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todoList");
let taskArr = [];
const TASK_KEY = "tasks";

function saveTask() {
  //taskArr의 내용물을 localStorage에 넣기
  localStorage.setItem(TASK_KEY, JSON.stringify(taskArr));
}

function countTaskNum() {
  const taskNum = document.querySelector("#taskNum");
  taskNum.innerText = `${taskArr.length} tasks left`;
}
function deleteTodo(event) {
  //클릭이벤트가 일어난 버튼의 부모요소li만을 삭제해야함
  //console.log(event);
  const xli = event.target.parentElement;
  xli.remove();
  taskArr = taskArr.filter((taskArr) => taskArr.id !== parseInt(xli.id));
  saveTask();
  countTaskNum();
}
function paintTodolist(newObj) {
  // 새로운 할일을 입력받아서 ul자식리스트를 만들고
  // x버튼을 누르면 delete함수를 호출한다
  const li = document.createElement("li");
  li.id = newObj.id;
  const span = document.createElement("span");
  span.innerText = newObj.text;
  const xbutton = document.createElement("button");
  xbutton.innerText = "❌";
  xbutton.addEventListener("click", deleteTodo);
  countTaskNum();
  li.appendChild(span);
  li.appendChild(xbutton);
  todoList.appendChild(li);
}

function handleTodoSubmit(e) {
  // 제출된 할일을 변수에 저장
  // input창을 비운다
  // 배열에 할일을 넣고
  // 할일목록을 그린다
  e.preventDefault();
  const newTask = todoInput.value;
  todoInput.value = "";
  const newObj = {
    id: Date.now(),
    text: newTask,
  };
  taskArr.push(newObj);
  paintTodolist(newObj);
  saveTask();
}

todoForm.addEventListener("submit", handleTodoSubmit);
//submit이 일어나기전까지는 아래를 실행

//이전에 저장된 할일이 있다면 화면에 미리 그려주어야 한다.
//스토리지의 내용물을 savedTask로 불러와서 할일이 있는지 없는지 확인
const savedTask = localStorage.getItem(TASK_KEY);
if (savedTask) {
  //localStrage에 이미 저장된 값이 있다면 아래를 실행
  const parsedTasks = JSON.parse(savedTask);
  //storage에는 string으로 저장되어 있으므로 oldtask를 배열에 넣으려면
  //javascript가 알수있는 배열로 바꿔주어야 한다.->parsesdTasks
  taskArr = parsedTasks;
  parsedTasks.forEach(paintTodolist);
  //이전의 oldtask들을 그려놓는다
}
