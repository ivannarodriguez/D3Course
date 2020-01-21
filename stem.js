const optDuration = 1 //2 years
const stemOptDuration = 2 //2 years

// store variable
let qualifyStem = d3.select(#stemExt).property.('value')

function endDate (str) {
  var date = new Date(str)
  var endDateTemp = new Date(date.setFullYear(date.getFullYear() + optDuration))
  var endDate = endDateTemp.toJSON().slice(0,10)
  return endDate
}

function stemStartDate (str) {
  if qualifyStem === 'Yes' {
    var date = new Date(str)
    var stemStartDateTemp = new Date(date.setDate(date.getDate() + stemOptDuration))
    var stemStartDate = stemStartDate.toJSON().slice(0,10)
    return stemStartDate
  }

}

function stemDrawLine (str) [
  if qualifyStem === 'Yes' {
    // ivanna's code
  }
]
