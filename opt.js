const graceDays = 60 //60 days
const earliestApplication = -90 //-90 days
const optDuration = 1 // 1 year
const stemOptDuration = 2 //2 years

let graduationDate = d3.select('#graduation').property('value')

let startingdate = d3.select('#startingdate').property('value')

let qualifyStem = d3.select('#stemExtension').property('value')

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
    var dateTemp = new Date(date.setFullYear(date.getFullYear()+ optDuration))
    var endDate = dateTemp.toJSON().slice(0,10);
    return endDate;
}

//let optEndDate = endOPT(startingdate)

//Function that recieves string with grace period end date and sets the max date on the
// starting date calendar
function setGracePeriodEnd (){
  graduationDate = d3.select('#graduation').property('value')
  var date = gracePeriodEnd(graduationDate)
  d3.select('#startingdate')
  .property('max', date);
}

//Function that recieves string with graduation date and set min date on the starting date
//calendar
function setGracePeriodStart (){
  graduationDate = d3.select('#graduation').property('value')
  d3.select('#startingdate')
  .property('min', graduationDate)
}

// This function will only work if a student qualifies for OPT. It recieves string with end date
// adds 2 years to the end date
function stemEndDate (str) {
  if (qualifyStem === 'Yes') {
    var date = new Date(str)
    var stemEndDateTemp = new Date(date.setFullYear(date.getFullYear() + stemOptDuration))
    var stemEndDate = stemEndDateTemp.toJSON().slice(0,10)
    return stemEndDate
  }
}
//let stemEnd = stemEndDate(optEndDate)

// This function will only draw a timeline if a stident qualifies for OPT.

/*function stemDrawLine (str)
//  if qualifyStem === 'Yes'
//
//

*/

d3.select('#graduation').on('input', setGracePeriodStart)
//d3.select('#graduation').on('input', setGracePeriodStart(graduationDate))
d3.select('#graduation').on('input', setGracePeriodEnd)

/*
*
* G R A P H I C  
* S T A R T S  H E R E
*/

let circledata = [{ x: 0, y: 300, r: 15, group: 'endpoint', html: ''}, //-90
                { x: 300, y: 300, r: 30, group: 'grad', html: ''},      //grad
                { x: 500, y: 300, r: 15, group: 'endpoint', html: ''},  //60
                { x: 1300, y: 600, r: 15, group: 'endpoint', html: ''}, //optend
                { x: 1400, y: 600, r: 15, group: 'endpoint', html: ''}, //opt60
                { x: 1000, y: 900, r: 15, group: 'endpoint', html: ''}, //stemstartapplying
                { x: 1300, y: 900, r: 15, group: 'endpoint', html: ''},] //stemstart


//adding a margin to the svg
let margin = {top: 5, bottom: 5, left: 50, right: 20 };
let svgWidth = 1000;
let svgHeight = 1000;
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// create svg for scatterplot to b at
let canvas = d3.select("body")
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                // .style('background-color', 'yellow')
                .append("g")
                  .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

//horizontal scale
let xScale = d3.scaleLinear()
  .domain(d3.extent(circledata.map(d => d.x)))
  .range([10,600])

//vertical scale
let yScale = d3.scaleLinear()
  .domain(d3.extent(circledata.map(d => d.y)))
  .range([10, 250]); //backwards because 0,0 is at top left corner


let circles = canvas.selectAll('circle')
                    .data(circledata)
                      .enter()
                      .append('circle')
                        .attr('cx', d => xScale(d.x))
                        .attr('cy', d=> yScale(d.y))
                        .attr('r', d=> d.r)
                        .attr('class', d=> d.group)
                        .style('fill', 'black');









