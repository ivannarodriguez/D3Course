const graceDays = 60

let graduationDate = d3.select('#graduation').property('value')
console.log(graduationDate)
let startingdate = d3.select('#startingdate').property('value')
console.log(startingdate)
console.log( typeof graduationDate)

function gracePeriodEnd (str){
    d3.select('#startingdate').setAttribute('max',)
}