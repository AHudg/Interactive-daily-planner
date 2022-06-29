// global variable used to iterate through array when needed (e.g., for setting time id for each div)
var hourArrayIterator = 0;
// initializes an array that contains the ids for each div that creates the scheduler "blocks"
var hourArray = ["eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen"];

// initializes the schedule upon page load
var createScheduler = function() {
// sets the current day to the top of the page
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

// for loop to create schedule blocks; i=8; i<17 so that I can use the value of i to set the hour w/ moment js
for (i=8; i<17; i++) {
    // dynamically creates a <div class='col-12 row' id='hour'>
    var createBlockEl = $("<div class='col-12 row time-block' id='" + hourArray[hourArrayIterator] + "'>");

    // dynamically creates a <span> element to house our time
    var spanEl = $("<span class='col-2 hour'>");
    spanEl.text(moment().set('hour',i).format("h a"));
    // dynamically creates the area we will be able to write to for scheduling
    var textareaEl = $("<textarea class='col-8 description' id='" + hourArray[hourArrayIterator] + "'>");
    // dynamically creates the button to save our entered data
    var buttonEl = $("<button class='col-2 saveBtn' id='" + hourArray[hourArrayIterator] + "'>");
    // creates the save icon for the button - adds the id here as well to allow you to click the icon and the javascript still saves; without it, it throws an error;
    var iconEl = $("<i class='fa fa-save' id='" + hourArray[hourArrayIterator] + "'>");

    // find the <div id='parent' and append a dynamically created <div> that will serve as a container for our time, text area, and button
    $("div#parent").append(createBlockEl);
    // append the dynamically created elements to the schedule block
    $(createBlockEl).append(spanEl);
    $(createBlockEl).append(textareaEl);
    $(createBlockEl).append(buttonEl);
    // appends the icon to the button
    $(buttonEl).append(iconEl);

    // increase the global iterator we created; This is used to iterate through the hourArray grabbing the correct id
    hourArrayIterator++;
};
};

// color the background initially according to the current time (without this code- the backgrounds don't populate until the first timer audits)
var initialize = function() {
    for (i = 0; i < hourArray.length; i++) {
        getId($("textarea#"+hourArray[i]));
    };
}

// grabs the id that is associated with the particular textare
var getId = function (element) {
    // grabs the id set for each textarea
    var hour = $(element).attr('id');
    // creates a new time that we will set for hours to check against
    var divTime = new Date();

    // switch case logic to decide what hour we will audit the current time against
    switch(hour) {
        case "eight":
            // sets the time for divTime as "08:00:00"
            divTime.setHours(8,0,0);
            // sends this time and the textarea to checkHour function
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
        default:
            break;
};
};

// logic for styling the textarea background color
var checkHour = function(checkTime,element) {
    // creates a variable for the current time
    var currentTime = new Date();

    // if the current time's hour is less than our set time hour -> it is green for future
    if (currentTime.getHours() < checkTime.getHours()) {
        $(element).addClass('future');
        $(element).removeClass('present');
        $(element).removeClass('past');
    // if the current time's hour is equal to the set time hour -> it is red for present
    } else if (currentTime.getHours() === checkTime.getHours()) {
        $(element).removeClass('future');
        $(element).addClass('present');
        $(element).removeClass('past');
    // if the current timer's hour is greater than the set time hour -> it is gray for past
    } else {
        $(element).removeClass('future');
        $(element).removeClass('present');
        $(element).addClass('past');
    }
};

// creates a setInterval to audit the current time against our time schedule blocs
setInterval(function() {
    $('textarea').each(function() {
        getId($(this));
    });
}, 10000);

// saves the textarea value and the specific time into an object then store all the objects in an array in localStorage
var saveTextarea = function(event) {
    // grabs the id of the button which corresponds to the id of the schedule block it is in
    var timeBlock = $(event.target).attr('id');
    // locates the text w/in the textarea which is stored under value
    var scheduleText = $("textarea#"+timeBlock)[0].value;

    // neatly packs the text into an object that also tells the schedule block id
    scheduleObj = {
        id: timeBlock,
        text: scheduleText
    };

    // grab any information from localStorage prior to sending our information
    scheduleArray = JSON.parse(localStorage.getItem("Schedule Info"));

    // if my variable didn't exist in localStorage, create an empty array
    if (!scheduleArray) {
        scheduleArray = [];
        scheduleArray.push(scheduleObj);
    // if it already exist in localStorage... let's update it    
    } else {
        // initialize two variables to use for the while loop which will iterate like a for loop? I know... it's crazy
        var i = -1;
        var j = 0;
        // while both conditions firstCondition and secondCondition are true... run my loop
        // the firstCondition is using the return of .indexOf as logic. .indexOf returns -1 if the value timeBlock is not found within the array
        // .indexOf returns 0 when it does find the correct value of timeBlock in the array - thus break the loop because we found what we want to write over
        // the secondCondition is to iterate through the variable scheduleArray.length
        // therefore, when it iterates through the final value of the array- it will break the loop since there was no match at all (thus stopping what would be a never-ending while loop)
        while ((i < 0) && (j < scheduleArray.length)) {
            // returns an array of the object parameters
            var values = Object.values(scheduleArray[j]);
            // returns -1 if the value of timeBlock is not within the object-made-array
            i = values.indexOf(timeBlock);
            // increment j to iterate through the scheduleArray.length until the end
            j++;
        };
        // if we break out of the while loop because we matched timeBlock to an object parameter- overwrite that index's current value with what the saveBtn is trying to save currently
        // this inhibits my scheduleArray from being infinitely long due to just pushing scheduleObj after scheduleObj that may or may not share the same timeBlock value
        if (i === 0) {
            // decrement j to get the true index of the array (this is necessary based on the while loop incrementing j AFTER we already found the index we want)
            j--;
            // overwrite the object here with the new object the saveBtn is trying to create
            scheduleArray[j] = scheduleObj;
        // else: if we broke out of the while loop due to exceeding scheduleArray.length
        } else {
            // simply push to the scheduleArray since an object with our particular timeBlock does not yet exist within scheduleArray
            scheduleArray.push(scheduleObj);
        }
    };

    // sends all the objects within the scheduleArray to be stored in localStorage
    localStorage.setItem("Schedule Info", JSON.stringify(scheduleArray));
};

// loads the localStorage data and displays in the specific textarea if applicable
var loadSchedule = function() {
    scheduleArray = JSON.parse(localStorage.getItem("Schedule Info"));
    // if the variable exist in localStorage... proceed
    if (scheduleArray) {
        // iterates through the variable returned from local storage
        for (i=0;i<scheduleArray.length;i++) {
            // gathers the id of the specific time block for the schedule and the text to input
            var timeBlock = scheduleArray[i].id;
            var scheduleText = scheduleArray[i].text;
            
            // switch case to assign the text (scheduleText) to that specific time associated textarea (timeBlock)
            switch(timeBlock) {
                case "eight":
                    // targets the specific textarea according to the timeblock id and places the text
                    $("textarea#"+timeBlock).text(scheduleText);
                    break;
                case "nine":
                    $("textarea#"+timeBlock).text(scheduleText);
                    break;
                case "ten":
                    $("textarea#"+timeBlock).text(scheduleText);
                    break;
                case "eleven":
                    $("textarea#"+timeBlock).text(scheduleText);
                    break;
                case "twelve":
                    $("textarea#"+timeBlock).text(scheduleText);
                    break;
                case "thirteen":
                    $("textarea#"+timeBlock).text(scheduleText);
                    break;
                case "fourteen":
                    $("textarea#"+timeBlock).text(scheduleText);
                    break;
                case "fifteen":
                    $("textarea#"+timeBlock).text(scheduleText);
                    break;
                case "sixteen":
                    $("textarea#"+timeBlock).text(scheduleText);
                    break;
            };
        };
    };
};

// calls createScheduler to create the schedule blocks
createScheduler();

// calls getId to populate schedule block background upon page load
initialize();

// loads any previous tasks into the respectable schedule time blocks
loadSchedule();

// event delegation
$("#parent").on("click",'.saveBtn', saveTextarea);