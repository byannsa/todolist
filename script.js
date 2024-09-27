const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const filterTasksDropdown = document.getElementById("filter-tasks");

function addTask() {
    if(inputBox.value === ''){
        alert("Teks tidak boleh kosong");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    
    const lastFilter = localStorage.getItem("filter");
    if (lastFilter) {
        filterTasksDropdown.value = lastFilter;
    }

    filterTasks();
}

function filterTasks() {
    let tasks = listContainer.getElementsByTagName('li');
    let filterValue = filterTasksDropdown.value;

    for(let i = 0; i < tasks.length; i++) {
        switch(filterValue) {
            case "all":
                tasks[i].style.display = "";
                break;
            case "completed":
                if(tasks[i].classList.contains('checked')) {
                    tasks[i].style.display = "";
                } else {
                    tasks[i].style.display = "none";
                }
                break;
            case "not-completed":
                if(!tasks[i].classList.contains('checked')) {
                    tasks[i].style.display = "";
                } else {
                    tasks[i].style.display = "none";
                }
                break;
        }
    }

    localStorage.setItem("filter", filterValue);
}

showTask();
