// ?Declarations & Events
const tasksContainer = document.querySelector('.container')
const input = document.querySelector('.input')
const addBtn = document.querySelector('.add')
let tasksArray = []
addBtn.addEventListener('click', addTask)
document.addEventListener('DOMContentLoaded', onReload)


function buildTaskDom(data) {
    let task = document.createElement('div')
    task.classList.add('task')
    let taskText = document.createElement('p')
    taskText.classList.add('taskText')
    taskText.textContent = data
    let removeBtn = document.createElement('button')
    removeBtn.classList.add('remove')
    removeBtn.textContent = 'remove'
    let editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'edit'
    let checkBtn = document.createElement('button')
    checkBtn.classList.add('check')
    checkBtn.textContent = 'check'

    tasksContainer.appendChild(task)
    task.appendChild(taskText)
    task.appendChild(removeBtn)
    task.appendChild(editBtn)
    task.appendChild(checkBtn)


    // !-------------Remove FUNCTION:-------------
    removeBtn.addEventListener('click', removeTask)
    function removeTask(){
        task.remove()
        tasksArray = JSON.parse(localStorage.getItem('tasksKey'))
        tasksArray.splice(tasksArray.indexOf(data),1)
        localStorage.setItem('tasksKey', JSON.stringify(tasksArray))
    }

        // !-------------Edit FUNCTION:-------------



}

// !-------------AddTask FUNCTION:-------------
function addTask(e){
    e.preventDefault()
    if(input.value === ''){
        return;
    }
    buildTaskDom(input.value)
    
    tasksArray.push(input.value)
    localStorage.setItem('tasksKey', JSON.stringify(tasksArray))
    input.value = ''
} // end addTask Function.


// !-------------OnReload FUNCTION:-------------
function onReload(){
if(localStorage.getItem('tasksKey')){
    tasksArray = JSON.parse(localStorage.getItem('tasksKey'))
}
tasksArray.forEach((localValue)=>{
    buildTaskDom(localValue)

})
} // end onReload function.
