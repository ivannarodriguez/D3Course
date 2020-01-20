const graceDays = 60

let graduationDate = d3.select('#graduation')
console.log(graduationDate)
let startingdate = d3.select('#startingdate').property('value')
console.log(startingdate)
console.log( typeof graduationDate)

function gracePeriodEnd (str){
    var date = new Date(str);
    date.setDate(date + graceDays);
    return date
}
  


console.log(gracePeriodEnd(graduationDate))
var date = new Date(graduationDate);
console.log(date)
console.log(typeof date)
console.log( typeof graduationDate)
var newDate = date.setDate(date + gracePeriodEnd)
console.log(newDate)