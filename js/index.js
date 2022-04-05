// ?Declarations & Events
const tasksContainer = document.querySelector(".container");
const input = document.querySelector(".input");
const addBtn = document.querySelector(".add");
const saveBtn = document.querySelector(".save");
let tasksArray = [];
let checkArray = []
let localData = localStorage.getItem("tasksKey");
let editStatus = 'off'
addBtn.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", onReload);

function buildTaskDom(data) {
  //taskParent
  const task = document.createElement("div");
  task.classList.add("task");
  tasksContainer.appendChild(task);
  //taskText
  const taskText = document.createElement("p");
  taskText.classList.add("taskText");
  task.appendChild(taskText);
  taskText.textContent = data;
  //remove
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove");
  removeBtn.textContent = "remove";
  task.appendChild(removeBtn);
  //edit
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "edit";
  task.appendChild(editBtn);
  //check
  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check");
  checkBtn.textContent = "check";
  task.appendChild(checkBtn);
  //save
  const saveBtn = document.createElement("button");
  saveBtn.classList.add("save");
  saveBtn.style.display = "none";
  saveBtn.textContent = "save";
  task.appendChild(saveBtn);

  // !-------------Remove FUNCTION:-------------
  removeBtn.addEventListener("click", removeTask);
  function removeTask() {
    task.remove();
    tasksArray = JSON.parse(localStorage.getItem("tasksKey"));
    tasksArray.splice(tasksArray.indexOf(data), 1);
    saveToLocal();
  }

  // !-------------Edit FUNCTION:-------------
  editBtn.addEventListener("click", editTask);
  function editTask() {
if(editStatus === 'off'){
    input.value = taskText.textContent;
    editBtn.textContent = 'save';
    editStatus = 'on'
}else{
    taskText.textContent = input.value;
    tasksArray = JSON.parse(localData);
    tasksArray.splice(tasksArray.indexOf(input.value), 1, input.value);
    input.value = "";
    editBtn.textContent = 'edit';
    editStatus = 'off'
    saveToLocal();
}
  } //end Edit

  // !-------------Check FUNCTION:-------------
  checkBtn.addEventListener("click", CheckTask);
  function CheckTask() {
    tasksArray = JSON.parse(localData); 
     
      taskText.style.textDecoration = "line-through";

    if(taskText.style.textDecoration = "line-through"){
        checkArray.push('on')
        console.log(input.value);
        localStorage.setItem("checkKey", JSON.stringify(checkArray))
        checkArray = JSON.parse(localStorage.getItem("checkKey")) 
        let ckeckValue = checkArray.tasksArray.indexOf(input.value)
        if(input.value === tasksArray.value){
        }
    }
  }
} //end dom

// !-------------AddTask FUNCTION:-------------
function addTask(e) {
  e.preventDefault();
  if (input.value === "") {
    return;
  }
  buildTaskDom(input.value);
  tasksArray.push(input.value);
  saveToLocal();
  input.value = "";
} // end Add.

// !-------------saveToLocal FUNCTION:-------------
function saveToLocal() {
  localStorage.setItem("tasksKey", JSON.stringify(tasksArray));
}

// !-------------OnReload FUNCTION:-------------
function onReload() {
  if (localData) {
    tasksArray = JSON.parse(localData);
  }
  tasksArray.forEach((localValue) => {
    buildTaskDom(localValue);
  });


} // end onReload function.

