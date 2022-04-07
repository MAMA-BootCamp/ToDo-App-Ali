'use strict';
// ?Declarations:
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

// !-------------AddTask FUNCTION:-------------
addBtn.addEventListener("click", addTask);
function addTask(e) {
  e.preventDefault();
  if (input.value === "") {
    return;
  }
  buildTaskDom(input.value);
  tasksArray.push(input.value);
  // push default off value to checkArray, so we compare the indexes later.
  checkArray.push("off");
  saveToLocal();
  input.value = "";
} // end Add.

// !-------------BuildTaskDom FUNCTION:-------------
// build basic task dom elements, with all their functions next to them.
function buildTaskDom(data) {
  //taskParent A
  const task = document.createElement("div");
  task.classList.add("task");
  tasksContainer.appendChild(task);
  //taskText A-a
  const taskText = document.createElement("p");
  taskText.classList.add("taskText");
  task.appendChild(taskText);
  taskText.textContent = data;
  //remove A-b
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove");
  removeBtn.classList.add("btn");
  // removeBtn.classList.add("fa-solid fa-trash");
  removeBtn.textContent = "remove";
  task.appendChild(removeBtn);
  //edit A-c
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.classList.add("btn");
  // removeBtn.classList.add("fa-solid fa-pen-to-square");
  editBtn.textContent = "edit";
  task.appendChild(editBtn);
  //check A-d
  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check");
  checkBtn.classList.add("btn");
  checkBtn.textContent = "check";
  task.appendChild(checkBtn);

  // !-------------Remove FUNCTION:-------------
  removeBtn.addEventListener("click", removeTask);
  function removeTask() {
    // remove task
    task.remove();
    // remove task value from local storage
    tasksArray = JSON.parse(localStorage.getItem("tasksKey"));
    tasksArray.splice(tasksArray.indexOf(data), 1);
    saveToLocal();
    // remove check value from local storage 
    checkArray = JSON.parse(localStorage.getItem("checkKey"));
    let tasksIndex = tasksArray.indexOf(taskText.textContent);
    checkArray.splice(tasksIndex, 1);
    saveToLocal();
    }

  // !-------------Edit FUNCTION:-------------
  editBtn.addEventListener("click", editTask);
  function editTask() {
    
    if (editStatus === "off") { // 1st click
      input.value = taskText.textContent;
      editBtn.textContent = "save";
      editStatus = "on";
    } else { // 2nd click
      tasksArray = JSON.parse(localStorage.getItem("tasksKey"));
      // store old value
      let tasksIndex = tasksArray.indexOf(taskText.textContent);
      // submit new value
      taskText.textContent = input.value;
      // replace indexOf(old) with new
      tasksArray.splice(tasksIndex, 1, input.value);
      input.value = "";
      editBtn.textContent = "edit";
      editStatus = "off";
      saveToLocal();
    }
  } 

  // !-------------Check FUNCTION:-------------
  checkBtn.addEventListener("click", CheckTask);
  function CheckTask() {
    if (checkStatus === "off") { // 1st click
      taskText.style.textDecoration = "line-through";
      checkBtn.textContent = "uncheck";
      // replace the default off to on
      checkArray = JSON.parse(localStorage.getItem("checkKey"));
      let tasksIndex = tasksArray.indexOf(taskText.textContent);
      checkArray.splice(tasksIndex, 1, 'on');
      checkStatus = "on";
      saveToLocal();
    } else { // 2nd click
      taskText.style.textDecoration = "none";
      checkBtn.textContent = "check";
      // replace on back to off
      checkArray = JSON.parse(localStorage.getItem("checkKey"));
      let tasksIndex = tasksArray.indexOf(taskText.textContent);
      checkArray.splice(tasksIndex, 1, 'off');
      checkStatus = "off";
      saveToLocal();
    }
  } 

} // end DOM

// !-------------saveToLocal FUNCTION:-------------
function saveToLocal() {
  localStorage.setItem("tasksKey", JSON.stringify(tasksArray));
  localStorage.setItem("checkKey", JSON.stringify(checkArray));

}

// !-------------OnReload FUNCTION:-------------
document.addEventListener("DOMContentLoaded", onReload);
function onReload() {
  // if there are already the 2 arrays in local, bring them.
  if (localData && localCheck ){
    tasksArray = JSON.parse(localData);
    checkArray = JSON.parse(localCheck);
  }

  tasksArray.forEach((localValue) => {
    buildTaskDom(localValue);
  }); 

  // give check style to all already decorated browser tasks.
  const taskText = document.querySelectorAll('.taskText')
  const checkBtn = document.querySelectorAll('.check')
  for (let i = 0; i < checkArray.length; i++) {
    if (checkArray[i] === 'on') {
      taskText[i].style.textDecoration = "line-through";
      checkBtn[i].textContent = 'uncheck'
    } 
  } 
} 
