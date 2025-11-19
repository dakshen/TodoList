
const todolist=document.querySelector("#todo-list");
const addbtn=document.getElementById("add-button");
const task=document.getElementById("todo-input");





addbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    handleTodo();
})

addbtn.addEventListener('keydown',(e)=>{
    if(e.key=="Enter")
    {
        e.preventDefault();
        handleTodo();
    }
})





let idcounter=Number(localStorage.getItem("idcounter")) || 0;

function saveTodos(){
    const todos=[];
    document.querySelectorAll("#todo-list .todo").forEach(li =>{
        const checkbox=li.querySelector("input[type='checkbox']");
        const text=li.querySelector(".todo-text").innerText;

        todos.push({
            id:checkbox.id,
            text:text,
            completed:checkbox.checked
        })
    });

    localStorage.setItem("todos",JSON.stringify(todos));
    localStorage.setItem("idcounter",idcounter);
}

function handleTodo(){
    const text=task.value.trim();
    if (text==="")return;

    idcounter++;
    createTodoItem({
        id:`todo-${idcounter}`,
        text:text,
        completed:false
    })
    saveTodos();

    task.value="";
    task.focus();            
}

function createTodoItem(todo){
    const li=document.createElement("li");
    li.className="todo";
    if(todo.completed) li.classList.add("completed");

    li.innerHTML=`  <input type="checkbox" id="todo-${todo.id}" ${todo.completed? "checked":""}>
                    <label  class="custom-checkbox" for="todo-${todo.id}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-check" viewBox="0 0 16 16">
                        <path
                            d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                    </svg>
                </label>
                <label for="todo-${todo.id}" class="todo-text">
                    ${todo.text}
                </label>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg></i>
                </button>`;

    todolist.appendChild(li);
}



todolist.addEventListener("click",(e)=>{
   if( e.target.closest(".delete-button"))
        e.target.closest("li").remove();
        saveTodos();
        
})

todolist.addEventListener("change",(e)=>{
    const checkbox=e.target.closest("input[type='checkbox']");
    console.log("change event target:", e.target, "tag:", e.target.tagName, "type:", e.target.type);
    if(!checkbox) return;

    const li=checkbox.closest("li");
    if (checkbox.checked){
        li.classList.add("completed");
    }
    else{
        li.classList.remove("completed"); 
    }
    saveTodos();
});

function loadTodos(){
    const saved=JSON.parse(localStorage.getItem("todos") || []);
    saved.forEach(todo=> createTodoItem(todo));
}

loadTodos();
