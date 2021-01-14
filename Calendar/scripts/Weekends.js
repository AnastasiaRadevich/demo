const selectOption = document.querySelector('#window__select');
export default function getWeekends() {
    const days = document.querySelectorAll('.calendar__days div');
    const arrDays = Array.from(days)
    const itemSelect = document.querySelectorAll('.selected');
    const weekdays = document.querySelectorAll('.calendar__weekdays div');
    const arrSelect = Array.from(itemSelect);
    const arrWeekdays = Array.from(weekdays);
    let newArr = [];
    arrDays.map((item) => {
        if(item.classList.contains('selected-weekend')) return item.classList.remove('selected-weekend');
    })
    arrSelect.forEach(item => {
        for(let i = 0; i < arrWeekdays.length; i++) {
            if (item.innerHTML === arrWeekdays[i].innerHTML) {
                newArr.push(i)
            }
        }
    })
    newArr.forEach(item => {
        for (let j = item; j < arrDays.length;) {
            arrDays[j].classList.add('selected-weekend');
            j = j + 7;
        }
    })
}

selectOption.onclick = function(e) {
    let target = e.target;
    if(target.tagName.toLocaleLowerCase() != 'option') return;
    if (target.classList.contains('selected')) {
        target.classList.remove('selected');
        getWeekends();
    } else {
        target.classList.add('selected');
        getWeekends();
    }
}
