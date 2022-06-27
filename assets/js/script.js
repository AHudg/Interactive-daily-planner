// global variable used to iterate through array when needed (e.g., for setting time id for each div)
var arrayIterator = 0;

var createScheduler = function() {
// sets the current day to the top of the page
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

// initializes an array that contains the ids for each div that creates the scheduler "blocks"
var hourArray = ["eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen"];

// for loop to create schedule blocks
for (i=8; i<17; i++) {
    // dynamically creates a <div class='col-12 row' id='hour'>
    var createBlockEl = $("<div class='col-12 row time-block' id='" + hourArray[arrayIterator] + "'>");

    // dynamically creates a <span> element to house our time
    var spanEl = $("<span class='col-2 hour'>");
    spanEl.text(moment().set('hour',i).format("h a"));
    // dynamically creates the area we will be able to write to for scheduling
    var textareaEl = $("<textarea class='col-8 description' id='" + hourArray[arrayIterator] + "'>");
    // dynamically creates the button to save our entered data
    var buttonEl = $("<button class='col-2 saveBtn'>")

    // find the <div id='parent' and append a dynamically created <div> that will serve as a container for our time, text area, and button
    $("div#parent").append(createBlockEl);
    // append the dynamically created elements to the schedule block
    $(createBlockEl).append(spanEl);
    $(createBlockEl).append(textareaEl);
    $(createBlockEl).append(buttonEl);

    // increase the global iterator we created to iterate 
    arrayIterator++;
};
};

var getId = function (element) {
    var hour = $(element).attr('id');
    var divTime = new Date();

    switch(hour) {
        case "eight":
            divTime.setHours(8,0,0);
            checkHour(divTime,element);
            break;
        case "nine":
            divTime.setHours(9,0,0);
            checkHour(divTime,element);
            break;
        case "ten":
            divTime.setHours(10,0,0);
            checkHour(divTime,element);
            break;
        case "eleven":
            divTime.setHours(11,0,0);
            checkHour(divTime,element);
            break;
        case "twelve":
            divTime.setHours(12,0,0);
            checkHour(divTime,element);
            break;
        case "thirteen":
            divTime.setHours(13,0,0);
            checkHour(divTime,element);
            break;
        case "fourteen":
            divTime.setHours(14,0,0);
            checkHour(divTime,element);
            break;
        case "fifteen":
            divTime.setHours(15,0,0);
            checkHour(divTime,element);
            break;
        case "sixteen":
            divTime.setHours(16,0,0);
            checkHour(divTime,element);
            break;
};
};

var checkHour = function(checkTime,element) {
    var currentTime = new Date();

    if (currentTime.getHours() < checkTime.getHours()) {
        $(element).addClass('future');
        $(element).removeClass('present');
        $(element).removeClass('past');
    } else if (currentTime.getHours() === checkTime.getHours()) {
        $(element).removeClass('future');
        $(element).addClass('present');
        $(element).removeClass('past');
    } else {
        $(element).removeClass('future');
        $(element).removeClass('present');
        $(element).addClass('past');
    }
};

createScheduler();

setInterval(function() {
    $('textarea').each(function() {
        getId($(this));
    });
}, 10000);