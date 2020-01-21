const optDuration = 1 //2 years
const stemOptDuration = 2 //2 years

// store variable
let qualifyStem = d3.select(#stemExt).property.('value')

// Function takes in OPT start date and calculates OPT end date
let endDate = function endDate (str) {
    var date = new Date(str)
    var endDateTemp = new Date(date.setFullYear(date.getFullYear() + optDuration))
    var endDate = endDateTemp.toJSON().slice(0,10)
    return endDate
}

// Function takes regular OPT end date and adds 2 years calculate
function stemEndDate (str) {
  if qualifyStem === 'Yes' {
    var date = new Date(str)
    var stemEndDateTemp = new Date(date.setFullYear(date.setFullYear() + stemOptDuration))
    var stemEndDate = stemEndDate.toJSON().slice(0,10)
    return stemEndDate
  }

}

function stemDrawLine (str) [
  if qualifyStem === 'Yes' {
    // ivanna's code
  }
]
