const graceDays = 60

let graduationDate = d3.select('#graduation').property('value')
console.log(graduationDate)
let startingdate = d3.select('#startingdate').property('value')
console.log(startingdate)


function gracePeriodEnd (str){
    var date = new Date(str);
    var newDate = new Date(date.setDate(date.getDate() + graceDays));
    var finalNewDate = newDate.toJSON().slice(0,10)
    return finalNewDate
}
  
function setGracePeriodEnd (str){
    d3.select('#startingdate')
    .property('max', '2020-07-21')
    .attr('min', graduationDate)
}
console.log(gracePeriodEnd(graduationDate))
