// ?Declarations & Events
const tasksContainer = document.querySelector(".container");
const input = document.querySelector(".input");
const addBtn = document.querySelector(".add");
const saveBtn = document.querySelector(".save");
let tasksArray = [];
let localData = localStorage.getItem("tasksKey");
// let saveStatus = 'off'
addBtn.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", onReload);

function buildTaskDom(data) {
  //taskParent
  let task = document.createElement("div");
  task.classList.add("task");
  tasksContainer.appendChild(task);
  //taskText
  let taskText = document.createElement("p");
  taskText.classList.add("taskText");
  task.appendChild(taskText);
  taskText.textContent = data;
  //remove
  let removeBtn = document.createElement("button");
  removeBtn.classList.add("remove");
  removeBtn.textContent = "remove";
  task.appendChild(removeBtn);
  //edit
  let editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "edit";
  task.appendChild(editBtn);
  //check
  let checkBtn = document.createElement("button");
  checkBtn.classList.add("check");
  checkBtn.textContent = "check";
  task.appendChild(checkBtn);
  //save
  let saveBtn = document.createElement("button");
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
    localStorage.setItem("tasksKey", JSON.stringify(tasksArray));
  }

  // !-------------Edit FUNCTION:-------------
  editBtn.addEventListener("click", editTask);
  function editTask() {
    saveBtn.style.display = "block";
    editBtn.style.display = "none";
    input.value = taskText.textContent;

    // !---Save FUNCTION:---
    saveBtn.addEventListener("click", saveTask);
    function saveTask(e) {
      e.preventDefault();
      saveBtn.style.display = "none";
      editBtn.style.display = "block";
      taskText.textContent = input.value;
      tasksArray = JSON.parse(localData)
      tasksArray.splice(tasksArray.indexOf(input.value),1, input.value)
      localStorage.setItem('tasksKey', JSON.stringify(tasksArray))
      input.value = "";
    } //end Save
  } //end Edit

  // !-------------Check FUNCTION:-------------
} //end dom

// !-------------AddTask FUNCTION:-------------
function addTask(e) {
  e.preventDefault();
  if (input.value === "") {
    return;
  }
  buildTaskDom(input.value);

  tasksArray.push(input.value);
  localStorage.setItem("tasksKey", JSON.stringify(tasksArray));
  input.value = "";
} // end Add.

// !-------------OnReload FUNCTION:-------------
function onReload() {
  if (localData) {
    tasksArray = JSON.parse(localData);
  }
  tasksArray.forEach((localValue) => {
    buildTaskDom(localValue);
  });
} // end onReload function.
