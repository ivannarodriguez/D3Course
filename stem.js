const optDuration = 1 //2 years
const stemOptDuration = 2 //2 years


let qualifyStem = d3.select('#stemExt').property('value')

// Function takes in OPT start date and calculates OPT end date
let endDate = function endDate (str) {
    var date = new Date(str)
    var endDateTemp = new Date(date.setFullYear(date.getFullYear() + optDuration))
    var endDate = endDateTemp.toJSON().slice(0,10)
    return endDate
}
console.log(endDate('2019-01-28'))

// Function takes regular OPT end date and adds 2 years calculate
function stemEndDate (str) {
  if (qualifyStem === 'Yes') {
    var date = new Date(str)
    var stemEndDateTemp = new Date(date.setFullYear(date.getFullYear() + stemOptDuration))
    var stemEndDate = stemEndDateTemp.toJSON().slice(0,10)
    return stemEndDate
  }
}

console.log(stemEndDate('2020-01-29'))
