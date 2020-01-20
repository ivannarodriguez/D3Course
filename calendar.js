const graceDays = 60 //60 days
const earliestApplication = -90 //-90 days
const optDuration = 1 // 1 year


let graduationDate = d3.select('#graduation').property('value')
console.log(graduationDate)
let startingdate = d3.select('#startingdate').property('value')
//console.log(startingdate)

// Function that recieves graduation date and calculates the date of the 60 day grace 
//period after graduation
//Recieves string in format year-month-day and returns string in same format
function gracePeriodEnd (str){
    var date = new Date(str);
    var newDate = new Date(date.setDate(date.getDate() + graceDays));
    var finalNewDate = newDate.toJSON().slice(0,10);
    return finalNewDate;
}


// Function that recieves graduation date and calculates the date of the earliest 
// possible application day 
//Recieves string in format year-month-day and returns string in same format
function earlyApplicationDate (str){
    var date = new Date (str);
    var newDate = new Date(date.setDate(date.getDate()+ earliestApplication));
    var finalNewDate = newDate.toJSON().slice(0,10);
    return finalNewDate;
}


// Function that recieves starting date and calculates the end date of OPT
////Recieves string in format year-month-day and returns string in same format
function endOPT (str){
    var date = new Date(str);
    var newDate = new Date(date.setFullYear(date.getFullYear()+ optDuration))
    var finalNewDate = newDate.toJSON().slice(0,10);
    return finalNewDate;
}


function setGracePeriodEnd (str){
    d3.select('#startingdate')
    .property('max', '2020-07-21')
    .attr('min', graduationDate)
}
console.log(gracePeriodEnd(graduationDate))
console.log(earlyApplicationDate(graduationDate))
console.log(endOPT(startingdate))
