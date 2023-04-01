const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
selectDate = document.querySelector('.select-date'),
closeSelectDate = document.querySelector(".close-select-date"),
changeYear = document.querySelectorAll(".change-year"),
selectedYear = document.querySelector('.year'),
selectMonth = document.querySelector(".months"),
colorToggle = document.querySelector('.color-mode-toggle'),
prevNextIcon = document.querySelectorAll(".icons");


// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month's last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year match
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month's first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current month and year as currentDate text
    daysTag.innerHTML = liTag;
    //add active class to current day
    let allDays = document.querySelectorAll(".days li");
    allDays.forEach(day => {
        currentDay = day.textContent;
        if(Number(currentDay) === Number(date.getDate()) && !day.classList.contains('inactive') && Number(currMonth) === Number(new Date().getMonth()) && Number(currYear) === Number(new Date().getFullYear())){
            day.classList.add('active');
        }else{
            day.classList.remove('active');
        }
    }) 
    
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrease current month by 1 else increase it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // create a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar();
    });
});

//show select date modal on click of current date
currentDate.onclick = () => {
    selectDate.classList.add("show");
    //display current year
    let displayedDate = currentDate.textContent;
    selectedYear.textContent = displayedDate.split(' ')[1];
    
}
closeSelectDate.addEventListener('click', () => {
    closeModal();
})
//select any year of choice from the modal
changeYear.forEach(btn => {
    btn.addEventListener("click", function(){
        if(this.dataset.id === 'nxt'){
            selectedYear.textContent = Number(selectedYear.textContent) + 1;
            currYear = selectedYear.textContent;
            renderCalendar();
        }else {
            selectedYear.textContent = Number(selectedYear.textContent) - 1;
            currYear = selectedYear.textContent;
            renderCalendar();
        }
    })
})
//create a list of months by selecting the first 3 letters of each month in the months array
selectMonth.innerHTML = months.map((month, index) => {
    return `<li><button id=${index}>${month.slice(0, 3)}</button></li>`
}).join("");
//select any month of choice from the modal
selectMonth.onclick = (e) => {
    let newYear = selectedYear.textContent,
        newMonth = e.target.id;
    //!IMPORTANT: Please change the data type of currMonth to number to get correct date
    currMonth = Number(newMonth);
    currYear = newYear;
    renderCalendar();
    closeModal();
}
//change color mode
colorToggle.onclick = function() {
    this.classList.toggle('slide');
    document.body.classList.toggle('dark-mode');
}

//close year and month modal
function closeModal(){
    selectDate.classList.remove("show");
}