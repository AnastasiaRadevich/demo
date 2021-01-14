import showHolidays from "./Holidays.js";
import getWeekends from "./Weekends.js";
import hideDays from "./HideDays.js";
import createToDo from "./ToDo.js";

const settingIcon = document.querySelector('#setting__icon');
const modalWindow = document.querySelector('#window');
const closeWindow = document.querySelector('.fa-times')
const weekdaysDiv = document.querySelector('.calendar__weekdays div');
const choice1 = document.querySelector('#choice1');
const choice2 = document.querySelector('#choice2');
const checkboxHide = document.querySelector('#window__check');
const selectOption = document.querySelector('#window__select');
const selectDays = document.querySelectorAll('#window__select option');
const toggleSwitch = document.querySelector('#switch-checkbox');
const calendar = document.querySelector('.calendar');
const calendarContainer = document.querySelector('.calendar-container');
const toDoContainer = document.querySelector('.todo-container')
const days = document.querySelector('.calendar__days');
const headerDate = document.querySelector('#date');
const dateToDo = document.querySelector('.date h1');
const settingWeather = document.querySelector('#setting__weather')
let arrIndexTODO = [[], []];
const cross = document.querySelector('.cross');
const date = new Date();

let data;
let dayToDo;
let id, LIST;

let objCalendar = {
    state: {
        isToDo: false,
    },
    settings: {
        firstDay: true,
        hideDates: false,
        weekdays: ['false', 'false', 'false', 'false', 'false', 'true', 'true'],
        doings: [],
    },
    set fDay(value) {
        this.settings.firstDay = value
        this.saveSettingsData()
    },
    set fHide(value) {
        this.settings.hideDates = value;
        this.saveSettingsData();
    },
    set fWeekends(index) {
        let arr = this.settings.weekdays
        if (arr[index] === 'true') {
            arr[index] = 'false';
        } else {
            arr[index] = 'true';
        }
        this.saveSettingsData()
    },
    set fDoings(value) {
        this.settings.doings = value;
        this.saveSettingsData()
    },
    chDate() {
        const weekdays = document.querySelector('.calendar__weekdays');
        if (this.settings.firstDay) {
            weekdays.innerHTML = '<div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>';
        } else {
            weekdays.innerHTML = '<div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>';
        }
        this.changeDate()
    },
    saveSettingsData() {
        localStorage.setItem('objSettings', JSON.stringify(objCalendar.settings))
    },
    renderCalendar() {
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        date.setDate(1);
        document.querySelector('.date h1').innerHTML = month[date.getMonth()] + ` ${date.getFullYear()}`;
        document.querySelector('.date p').innerHTML = new Date().toDateString();
        let days = '';
        const monthDays = document.querySelector('.calendar__days');
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const firstDayIndex = date.getDay();
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        let nextDays;

        function renderPreviousDays() {
            if (this.settings.firstDay === false) {
                nextDays = 7 - lastDayIndex - 1;
                for (let x = firstDayIndex; x > 0; x--) {
                    days += `<div class = "prev-date">${prevLastDay - x + 1}</div>`;
                }
            } else {
                nextDays = 7 - lastDayIndex;
                for (let x = firstDayIndex; x > 1; x--) {
                    days += `<div class = "prev-date">${prevLastDay - x + 2}</div>`;
                }
            }
            if (firstDayIndex === 0) {
                for (let z = 5; z >= 0; z--) {
                    days += `<div class = "prev-date">${prevLastDay - z}</div>`;
                }
            }
        }

        function renderTodayDay() {
            for (let i = 1; i <= lastDay; i++) {
                if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                    days += `<div class = "today">${i}</div>`;
                } else {
                    days += `<div>${i}</div>`;
                }
            }
        }

        function renderNextDays() {
            for (let y = 1; y <= nextDays; y++) {
                days += `<div class = "next-date">${y}</div>`;
            }
        }

        renderPreviousDays.call(this)
        renderTodayDay()
        renderNextDays()

        monthDays.innerHTML = days;
    },
    changeDate() {
        this.renderCalendar();

        showHolidays(date.getMonth());

        function choiceFirstDay() {
            if (!(this.settings.firstDay)) {
                choice2.setAttribute('checked', 'checked')
            } else {
                choice1.setAttribute('checked', 'checked')
            }
        }

        function choiceHideDays() {
            if (this.settings.hideDates) {
                checkboxHide.setAttribute('checked', 'checked')
                hideDays()
            } else {
                checkboxHide.removeAttribute('checked')
            }
        }

        function choiceWeekdays() {
            let arrWeekdays = this.settings.weekdays;
            arrWeekdays.forEach((item, index) => {
                if (item === 'true') {
                    selectDays[index].classList.add('selected')
                    getWeekends()
                } else {
                    if (selectDays[index].classList.contains('selected')) {
                        selectDays[index].classList.remove('selected')
                    }
                }
            })
        }

        function showTODO() {
            if (this.state.isToDo) {
                if (this.settings.doings.length > 1) {
                    let todos = this.settings.doings;
                    todos[0].forEach(index => {
                        document.querySelectorAll('.calendar__days div')[index].classList.add('done')
                    })
                    todos[1].forEach(index => {
                        document.querySelectorAll('.calendar__days div')[index].classList.add('notdone')
                    })
                }
            }
        }

        choiceFirstDay.call(this)
        choiceHideDays.call(this)
        choiceWeekdays.call(this)
        showTODO.call(this)

        return getWeekends();
    },
}
export default function setSettings() {
    choice1.addEventListener('change', () => {
        weekdaysDiv.style.display = 'none';
        choice1.classList.add('checked');
        choice2.classList.remove('checked');
        objCalendar.fDay = true;
        objCalendar.chDate();
    })
    choice2.addEventListener('change', () => {
        weekdaysDiv.style.display = 'none';
        choice2.classList.add('checked');
        choice1.classList.remove('checked');
        objCalendar.fDay = false;
        objCalendar.chDate();
    })
    checkboxHide.addEventListener('click', () => {
        if (objCalendar.settings.hideDates) {
            objCalendar.fHide = false;
        } else {
            objCalendar.fHide = true;
        }
        objCalendar.chDate();
    })
    selectOption.onclick = function (e) {
        objCalendar.fWeekends = e.target.index;
        objCalendar.chDate()
    }
}

function checkData(data) {
    if (data !== null) {
        LIST = JSON.parse(data);
        id = LIST.length;
        loadList(LIST);
    } else {
        LIST = [];
        id = 0;
    }
}

function loadList(array) {
    array.forEach(function (item) {
        if (item.date === headerDate.textContent) {
            createToDo(item.name, item.id, item.done, item.trash, item.date);
        }
    });
}

function showToDo() {
    arrIndexTODO = [[], []]
    data = localStorage.getItem("TODO")
    if (data === null || data === undefined) {
        return
    }
    LIST = JSON.parse(data);
    let todos = LIST.filter(item => {
        let monthToDo = item.date.split(',')[0]
        if (monthToDo === dateToDo.textContent) {
            if (!(item.trash)) {
                return true;
            } else {
                removeToDo()
            }
        }
    })
    if (todos.length < 1) return
    let monthDay = document.querySelectorAll('.calendar__days div')
    let arrMonthDay = Array.from(monthDay)
    todos.forEach(item => {
        let dayToDo = item.date.split(', ')[1]
        for (let i = 0; i < arrMonthDay.length; i++) {
            if (arrMonthDay[i].textContent === dayToDo && !(arrMonthDay[i].classList.contains('prev-date'))
                && !(arrMonthDay[i].classList.contains('next-date'))) {
                if (item.done) {
                    arrIndexTODO[0].push(i)
                } else {
                    arrIndexTODO[1].push(i)
                }
                break;
            }
        }
        objCalendar.fDoings = arrIndexTODO;
    })
    objCalendar.changeDate()
}

function removeToDo() {
    if (objCalendar.state.isToDo) {
        let todos = objCalendar.settings.doings;
        todos[0].forEach(index => {
            document.querySelectorAll('.calendar__days div')[index].classList.remove('done')
        })
        todos[1].forEach(index => {
            document.querySelectorAll('.calendar__days div')[index].classList.remove('notdone')
        })
    }
}

document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    objCalendar.changeDate();
    hideDays();
    if (objCalendar.state.isToDo) {
        removeToDo()
        showToDo()
    }
});
document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    objCalendar.changeDate();
    hideDays();
    removeToDo()
    if (objCalendar.state.isToDo) {
        showToDo()
    }
});

window.onload = () => {
    let mySettings = localStorage.getItem('objSettings')
    if (mySettings) {
        objCalendar.settings = Object.assign(objCalendar.settings, JSON.parse(mySettings))
    }
    objCalendar.chDate()
}

settingIcon.addEventListener('click', () => {
    modalWindow.style.display = 'flex';
})
closeWindow.addEventListener('click', () => {
    modalWindow.style.display = 'none';
})

toggleSwitch.addEventListener('change', () => {
    removeToDo()
    objCalendar.state.isToDo = !(objCalendar.state.isToDo)
    if (objCalendar.state.isToDo) {
        showToDo()
    }
    data = localStorage.getItem("TODO");
})
days.addEventListener('click', (e) => {
    if (objCalendar.state.isToDo) {
        dayToDo = e.target;
        calendar.classList.add('translate');
        calendarContainer.classList.add('hide');
        toDoContainer.style.display = 'block';
        toDoContainer.classList.add('translate-reverse');
        calendar.style.background = '#fffff';
        headerDate.textContent = `${dateToDo.textContent}, ${dayToDo.textContent}`;
        checkData(data)
    }
})
cross.addEventListener('click', () => {
    calendar.classList.remove('translate');
    calendarContainer.classList.remove('hide');
    toDoContainer.style.display = 'none';
    const listChildren = document.querySelectorAll('#list .item')
    const arrChildren = Array.from(listChildren)
    if (arrChildren.length > 0) {
        arrChildren.map(item => {
            return item.parentNode.removeChild(item);
        })
    }
    showToDo()
})

document.addEventListener("keyup", function (even) {
    const input = document.getElementById("input");
    if (even.keyCode === 13) {
        const toDo = input.value;
        if (toDo) {
            createToDo(toDo, id, false, false);
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
                date: `${dateToDo.textContent}, ${dayToDo.textContent}`,
                isContentEdit: false,
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

settingWeather.addEventListener('click', () => {
    const weather = document.querySelector('.weather');
    const forecast = document.querySelector('.forecast-container');
    if (weather.classList.contains('hide')) {
        weather.classList.remove('hide')
        forecast.classList.remove('hide')
    } else {
        weather.classList.add('hide')
        forecast.classList.add('hide')
    }
})
