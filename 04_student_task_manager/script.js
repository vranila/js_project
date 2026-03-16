let tasks = JSON.parse(localStorage.getItem("tasks")) || []

let editIndex = -1

function saveTasks()
{
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

function showMessage(msg)
{
    document.getElementById("message").innerText = msg
    setTimeout(()=>{
    document.getElementById("message").innerText=""
    },2000)
}

function addTask()
{
    let taskInput = document.getElementById("taskInput")
    let dueDate = document.getElementById("dueDate")
    let taskText = taskInput.value
    if(taskText==="")
    {
        showMessage("Enter task")
        return
    }

    tasks.push({
    name:taskText,
    date:dueDate.value,
    completed:false
    })
    taskInput.value=""
    dueDate.value=""
    saveTasks()
    showMessage("Task Added")
    displayTasks()
}

function displayTasks()
{
    let list = document.getElementById("taskList")
    list.innerHTML=""
    let search = document.getElementById("search").value.toLowerCase()
    let filter = document.getElementById("filter").value
    tasks.forEach((task,index)=>
    {
    if(task.name.toLowerCase().indexOf(search)===-1)
    {
        return
    }

    if(filter==="pending" && task.completed)
    {
        return
    }

    if(filter==="completed" && !task.completed)
    {
        return
    }

    let li = document.createElement("li")
    li.draggable = true
    li.ondragstart = ()=>dragStart(index)
    let left = document.createElement("div")
    let checkbox = document.createElement("input")
    checkbox.type="checkbox"
    checkbox.checked=task.completed

    checkbox.onclick=()=>{
    task.completed=!task.completed
    saveTasks()
    displayTasks()
}

    let span = document.createElement("span")
    span.innerText = task.name + " (Due: "+task.date+")"

    if(task.completed)
    {
    span.classList.add("completed")
    }

    left.appendChild(checkbox)
    left.appendChild(span)

    let right = document.createElement("div")

    let editBtn = document.createElement("button")
    editBtn.innerText="Edit"

    editBtn.onclick=()=>
    {
        document.getElementById("taskInput").value = task.name
        document.getElementById("dueDate").value = task.date
        editIndex=index
    }

    let deleteBtn = document.createElement("button")
    deleteBtn.innerText="Delete"

    deleteBtn.onclick=()=>
    {
        tasks.splice(index,1)
        saveTasks()
        showMessage("Task Deleted")
        displayTasks()
    }

    right.appendChild(editBtn)
    right.appendChild(deleteBtn)

    li.appendChild(left)
    li.appendChild(right)

    li.ondragover=(e)=>e.preventDefault()
    li.ondrop=()=>dropTask(index)

    list.appendChild(li)

    })

}

function updateTask()
{
    if(editIndex===-1){
    showMessage("Select task to update")
    return
    }
    let taskInput=document.getElementById("taskInput")
    let dueDate=document.getElementById("dueDate")
    tasks[editIndex].name = taskInput.value
    tasks[editIndex].date = dueDate.value
    taskInput.value=""
    dueDate.value=""
    editIndex=-1
    saveTasks()
    showMessage("Task Updated")
    displayTasks()

}

let dragIndex

function dragStart(index)
{
    dragIndex=index
}

function dropTask(index)
{
    let dragged = tasks[dragIndex]
    tasks.splice(dragIndex,1)
    tasks.splice(index,0,dragged)
    saveTasks()
    displayTasks()

}

function toggleDarkMode()
{
    document.body.classList.toggle("dark")
}

displayTasks()