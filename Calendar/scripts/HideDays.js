export default function hideDays() {
    const check = document.querySelector('#window__check ');
    const otherDay = document.querySelectorAll('.prev-date, .next-date');
    const arrDays = Array.from(otherDay);
    if (check.checked) {
        arrDays.map((item => {
            return item.style.opacity = '0';
        }))
    } else {
        arrDays.map((item => {
            return item.style.opacity = '0.5';
        }))
    }
    check.addEventListener('click', () => {
        hideDays()
    })
}

