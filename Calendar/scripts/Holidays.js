export default function showHolidays(month) {
    const days = document.querySelectorAll('.calendar__days div');
    const arrDays = Array.from(days)
    const request = new XMLHttpRequest();
    request.open('GET', './config.json');
    request.send();
    request.onload = () => {
        let holidays = JSON.parse(request.response);
        let monthHolidays = holidays['holidays'].filter((item) => {
            return item.month === month.toString();
        })
        arrDays.map((item) => {
            monthHolidays.forEach(holiday => {
                if (item.textContent === holiday.day && !(item.classList.contains('prev-date') || item.classList.contains('next-date'))) {
                    item.style.background = '#ffbfbf';
                    item.style.borderRadius = '50%';
                    item.title = `${holiday.name}`;
                }
            })
        })
    }
}
