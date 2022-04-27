
var Today = new Date()
var year = Today.getYear()
var month = Today.getMonth()
var date = Today.getDate()
var day = Today.getDay()

if (year < 1000) {
    year += 1900
}

var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")

var dayArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
function timeApi() {
    var timeApiEl = document.querySelector("#time-api");
    var timeDisplayEl = document.createElement("div");
    timeDisplayEl.className = "time-api-display";
    timeDisplayEl.innerHTML = "<p>" + dayArray[day] + ", " + monthArray[month] + " " + date + ", " + year + "</p>";
    timeApiEl.appendChild(timeDisplayEl);
}
document.write(dayArray[day] + ", " + monthArray[month] + " " + date + ", " + year)


httpGetAsync(url)
