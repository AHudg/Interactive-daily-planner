// global variable used to iterate through array when needed (e.g., for setting time id for each div)
var arrayIterator = 0;

var createScheduler = function() {
// sets the current day to the top of the page
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

// initializes an array that contains the ids for each div that creates the scheduler "blocks"
var timeArray = ["eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen"];

// for loop to create schedule blocks
for (i=8; i<18; i++) {
    // dynamically creates a <div class='col-12 row' id='hour'>
    var createBlockEl = $("<div class='col-12 row time-block' id='" + timeArray[arrayIterator] + "'>");

    // dynamically creates a <span> element to house our time
    var spanEl = $("<span class='col-2 hour'>");
    spanEl.text(moment().set('hour',i).format("h a"));
    // dynamically creates the area we will be able to write to for scheduling
    var textareaEl = $("<textarea class='col-8'>");
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

createScheduler();