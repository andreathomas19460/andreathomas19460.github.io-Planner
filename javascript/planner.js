var currentDateElement = $("#currentDate");
var time = moment().hour();
var planData = [];
currentDate();
createTimeRow();
createInputBlock();
createSaveBlock();
blockColor();



function currentDate(){
    currentDateElement.text(moment().format('MMM Do YYYY'));
}

function createTimeRow(){
    for(var i = 0; i < 12; i++){
        var time = i + 8;
        var timeRow = $("<div>").addClass("row timeRows");
        timeRow.attr("id", `time-${time}`);
        $(".container").append(timeRow);
        var timeCol = $("<div>").addClass("time col-md-2").text(moment(time,'H').format('hh a'));
        var inputCol = createInputBlock(time, planData[i]);
        var saveCol = createSaveBlock(time);
        timeRow.append(timeCol);
        timeRow.append(inputCol);
        timeRow.append(saveCol);
    }
}

function createInputBlock(time, text) {
    var textArea = $("<textarea>");
    textArea.attr("id", `text-${time}`);
    textArea.addClass("col-md-8");
    blockColor(textArea, time);
    if (text != null) {
        textArea.val(text);
    }
    return $("<div>").append(textArea);
}


function createSaveBlock(time){
    var saveBtn = $('<button><i class="fas fa-save">SAVE</i></button>');
    saveBtn.attr("data-time", time);
    saveBtn.addClass("saveBtn");

    return $("<div>").addClass("col-md-2").append(saveBtn);
}

$(".saveBtn").click(function() {
    var time = $(this).attr("data-time");
    var text = $(`#text-${time}`).val();
    var index = parseInt(time) - 12;
    planData[index] = text;
    localStorage.setItem("planData", JSON.stringify(planData));
    console.log(planData)
})

local();

function local() {
    planData = localStorage.getItem("planData") != null
        ? JSON.parse(localStorage.getItem("planData")) : new Array(12);
}

function blockColor(element, timeSelected) {
    if (timeSelected < time) {
        element.addClass("past");
    } else if (timeSelected > time) {
        element.addClass("future");
    } else if (timeSelected === time) {
        element.addClass("present");
    }
}


