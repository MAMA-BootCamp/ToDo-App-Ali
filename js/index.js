'use strict';
// ?Declarations & Events
const tasksContainer = document.querySelector(".container");
const input = document.querySelector(".input");
const addBtn = document.querySelector(".add");
const saveBtn = document.querySelector(".save");
let tasksArray = [];
let checkArray = [];
let localData = localStorage.getItem("tasksKey");
let localCheck = localStorage.getItem("checkKey")
let editStatus = "off";
let checkStatus = "off";
addBtn.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", onReload);

// !-------------AddTask FUNCTION:-------------
function addTask(e) {
  e.preventDefault();
  if (input.value === "") {
    return;
  }
  buildTaskDom(input.value);
  tasksArray.push(input.value);
  checkArray.push("off");
  localStorage.setItem("checkKey", JSON.stringify(checkArray));
  saveToLocal();
  input.value = "";
} // end Add.

// !-------------BuildTaskDom FUNCTION:-------------
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

  // !-------------Remove FUNCTION:-------------
  removeBtn.addEventListener("click", removeTask);
  function removeTask() {
    // remove task
    task.remove();
    // remove task.input from local storage
    tasksArray = JSON.parse(localStorage.getItem("tasksKey"));
    tasksArray.splice(tasksArray.indexOf(data), 1);
    saveToLocal();
    // remove checkedInput from local storage 
    checkArray = JSON.parse(localStorage.getItem("checkKey"));
    let tasksIndex = tasksArray.indexOf(taskText.textContent);
    checkArray.splice(tasksIndex, 1);
    localStorage.setItem("checkKey", JSON.stringify(checkArray));
  }

  // !-------------Edit FUNCTION:-------------
  editBtn.addEventListener("click", editTask);
  function editTask() {
    if (editStatus === "off") {
      input.value = taskText.textContent;
      editBtn.textContent = "save";
      editStatus = "on";
    } else {
      tasksArray = JSON.parse(localStorage.getItem("tasksKey"));
      let tasksIndex = tasksArray.indexOf(taskText.textContent);
      taskText.textContent = input.value;
      tasksArray.splice(tasksIndex, 1, input.value);
      saveToLocal();
      input.value = "";
      editBtn.textContent = "edit";
      editStatus = "off";
    }
  } // end Edit

  // !-------------Check FUNCTION:-------------
  checkBtn.addEventListener("click", CheckTask);
  function CheckTask() {
    if (checkStatus === "off") {
      taskText.style.textDecoration = "line-through";
      checkBtn.textContent = "uncheck";
      // taskText.textContent = input.value;
      tasksArray = JSON.parse(localStorage.getItem("tasksKey"));
      checkArray = JSON.parse(localStorage.getItem("checkKey"));
      let tasksIndex = tasksArray.indexOf(taskText.textContent);
      checkArray.splice(tasksIndex, 1, 'on');
      localStorage.setItem("checkKey", JSON.stringify(checkArray));
      checkStatus = "on";
    } else {
      taskText.style.textDecoration = "none";
      checkBtn.textContent = "check";
      tasksArray = JSON.parse(localStorage.getItem("tasksKey"));
      checkArray = JSON.parse(localStorage.getItem("checkKey"));
      let tasksIndex = tasksArray.indexOf(taskText.textContent);
      checkArray.splice(tasksIndex, 1, 'off');
      localStorage.setItem("checkKey", JSON.stringify(checkArray));
      checkStatus = "off";
    }
    
  } // end check
} //end dom

// !-------------saveToLocal FUNCTION:-------------
function saveToLocal() {
  localStorage.setItem("tasksKey", JSON.stringify(tasksArray));
}

// !-------------OnReload FUNCTION:-------------
function onReload() {
  if (localData && localCheck ) {
    tasksArray = JSON.parse(localData);
    checkArray = JSON.parse(localCheck);
  }
  tasksArray.forEach((localValue, i) => {
    buildTaskDom(localValue);
  }); // end forEach

  // give check style to all already decorated tasks
  const taskText = document.querySelectorAll('.taskText')
  const checkBtn = document.querySelectorAll('.check')

  for (let i = 0; i < checkArray.length; i++) {
    if (checkArray[i] === 'on') {
      taskText[i].style.textDecoration = "line-through";
      checkBtn[i].textContent = 'uncheck'
    } 
  } // end forloop check
} // end onReload function.
