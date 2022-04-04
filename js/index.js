// !Declarations
const tasksContainer = document.querySelector('.container')
const input = document.querySelector('.input')
const addBtn = document.querySelector('.add')
let tasksArray = []
// !Events
addBtn.addEventListener('click', addTask)


function buildTaskDom(inputData) {
    let task = document.createElement('div')
    task.classList.add('task')
    let taskText = document.createElement('p')
    taskText.classList.add('taskText')
    taskText.textContent = inputData

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

// AddTask FUNCTION:

function addTask(e){
    
    e.preventDefault()
    if(input.value !== ''){
        buildTaskDom(input.value)
    }
 
}