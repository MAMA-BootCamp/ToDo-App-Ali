// ?Declarations
const tasksContainer = document.querySelector('.container')
const input = document.querySelector('.input')
const addBtn = document.querySelector('.add')
let tasksArray = []

// ?Events
addBtn.addEventListener('click', addTask)
document.addEventListener('DOMContentLoaded', onReload)


function buildTaskDom(data) {
    let task = document.createElement('div')
    task.classList.add('task')
    let taskText = document.createElement('p')
    taskText.classList.add('taskText')
    taskText.textContent = data

    let remove = document.createElement('button')
    remove.classList.add('remove')
    remove.textContent = 'remove'

    let edit = document.createElement('button')
    edit.classList.add('edit')
    edit.textContent = 'edit'

    let check = document.createElement('button')
    check.classList.add('check')
    check.textContent = 'check'

    tasksContainer.appendChild(task)
    task.appendChild(taskText)
    task.appendChild(remove)
    task.appendChild(edit)
    task.appendChild(check)

}

// !-------------AddTask FUNCTION:-------------
function addTask(e){
    
    e.preventDefault()
    if(input.value !== ''){
        buildTaskDom(input.value)
    }
    tasksArray.push(input.value)
    localStorage.setItem('tasksKey', JSON.stringify(tasksArray))



    //!-------------Remove FUNCTION:-------------


    
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
