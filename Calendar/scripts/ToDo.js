const list = document.getElementById("list");
let data = localStorage.getItem("TODO");

let LIST;
LIST = JSON.parse(data);

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

export default function createToDo(toDo, id, done, trash) {
    if(trash){ return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                     <i class="fas fa-pen re" job="rename" id="${id}"></i>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    list.insertAdjacentHTML("beforeend", item);
}

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    data = localStorage.getItem("TODO");
    LIST = JSON.parse(data);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    data = localStorage.getItem("TODO");
    LIST = JSON.parse(data);
    LIST[element.id].trash = true;
}

function rename(element){
    data = localStorage.getItem("TODO");
    LIST = JSON.parse(data);
    if(LIST[element.id].isContentEdit === true) {
        LIST[element.id].name = element.parentNode.querySelector(".text").textContent
    }
    LIST[element.id].isContentEdit = LIST[element.id].isContentEdit ? false : true;
    element.parentNode.querySelector(".text").contentEditable = LIST[element.id].isContentEdit;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob === "complete"){
        completeToDo(element);
    }else if(elementJob === "delete"){
        removeToDo(element);
    } else if(elementJob === "rename"){
        rename(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});