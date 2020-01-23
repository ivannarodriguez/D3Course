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

// Margin Convention
let margins = { top: 20, right: 25, bottom: 30, left: 40 }
let svgouterWidth = 800
let svgouterHeight = 500
let innerWidth = svgouterWidth - margins.left - margins.right
let innerHeight = svgouterHeight - margins.top - margins.bottom
let tlength = innerWidth/2.6
let r1 = 15
let r2 = 45

d3.select('div#dropdowns')
    .attr('width', svgouterWidth);
//append svg to the body of the page
let svg = d3.select('div#canvas svg#chart')
            .attr('width', svgouterWidth)
            .attr('height', svgouterHeight)
            .append('g')
              .attr('id', "plot-area")
              .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
    // USCIS can receive your app section
    // horizontal line
    svg.append("line")
      .attr("class", "blackline")
      .attr('x1',0)
      .attr('y1',innerHeight/2)
      .attr('x2',tlength)
      .attr('y2',innerHeight/2);
    //-90 days (leftmost circle and line)
    svg.append("circle")
      .attr("id","ninetydays")
      .attr("class", "endpoints")
      .attr("cx", 0)
      .attr("cy", innerHeight/2)
      .attr("r", r1);
    svg.append("line")
      .attr("class", "blackline")
      .attr('x1',0)
      .attr('y1',innerHeight/2-r1)
      .attr('x2',0)
      .attr('y2',innerHeight/2+r1);
    //+60 days  (rightmost circle and line)
    svg.append("circle")
      .attr("class", "endpoints")
      .attr("cx", tlength) //x posiion plus radius
      .attr("cy", innerHeight/2)
      .attr("r", r1);
    svg.append("line")
        .attr("class", "blackline")
        .attr('x1',tlength)
        .attr('y1',innerHeight/2-r1)
        .attr('x2',tlength)
        .attr('y2',innerHeight/2+r1);
    
     //Graduation label
     svg.append("circle")
     .attr("id", "gradcircle")
     .attr("cx", tlength -  tlength/3)
     .attr("cy", innerHeight/2)
     .attr("r", 30)
     .attr("fill", "#97252B")
     .attr("opacity", 0.4);
   svg.append("text")
     .text('GRAD')
     .attr('id', 'gradlabel')
     .style('fill', 'white')
     .attr('x', tlength -  tlength/3 - 1.2*r1)
     .attr('y', innerHeight/2 -r1/2);

    //dotted lines
    //bottom
    svg.append('rect')
      .attr('class', 'dottedline')
      .attr('x', tlength -  tlength/3 )
      .attr('y', innerHeight/2)
      .attr('width', tlength/3)
      .attr('height', 2 * r2);
    //top
    svg.append('rect')
      .attr('class', 'dottedline')
      .attr('x', 0)
      .attr('y', innerHeight/4)
      .attr('width', tlength)
      .attr('height', innerHeight/4);

    //text
    // svg.append("text")
    //   .text('-90 days')
    //   .attr('class', 'labels')
    //   .attr('x', tlength/8 + r1)  
    //   .attr('y', innerHeight/2 - r1/2);
    svg.append("text")
      .text('USCIS can receive your application')
      .attr('class', 'labels')
      .attr('x', tlength/8)
      .attr('y', innerHeight/4.5);
    svg.append("text")
      .text('OPT Starts')
      .attr('class', 'labels')
      .attr('x', tlength-1.80*r2)
      .attr('y', innerHeight/2 + 2.8 * r2);
  //  svg.append("text")
  //     .text('+60 days')
  //     .attr('class', 'labels')
  //     .attr('x', tlength/8 + 4 * r2)  
  //     .attr('y', innerHeight/2 - r1/2);
    svg.append("text")
      .text('OPT Ends')
      .attr('class', 'labels')
      .attr('x', 2 * tlength)
      .attr('y', innerHeight/2 + 2.8 * r2);
    svg.append("text")
      .text('60 days')
      .attr('class', 'labels')
      .attr('x', 2.17 * tlength)
      .attr('y', innerHeight/2 + 1.75 * r2);

    // One year OPT timeline
    // vertical lines and gray rectangle
    svg.append('rect')
      .attr('id', 'tp')
      .attr('class', 'endpoints')
      .style('opacity', '0.3')
      .attr('x', tlength -  tlength/3)
      .attr('y', innerHeight/2 + 1.85 * r2)
      .attr('width', tlength/3)
      .attr('height', r1);
    svg.append("line")
      .attr("class", "blackline")
      .attr('x1',tlength -  tlength/3)
      .attr('y1', innerHeight/2 + 2 * r2 - r1)
      .attr('x2',tlength -  tlength/3)
      .attr('y2', innerHeight/2 + 2 * r2 + r1);
    svg.append("line")
      .attr("class", "blackline")
      .attr('x1',tlength)
      .attr('y1', innerHeight/2 + 2 * r2 - r1)
      .attr('x2',tlength)
      .attr('y2', innerHeight/2 + 2 * r2 + r1);
    // long line
    svg.append("line")
      .attr("class", "blackline")
      .attr("id", "optline")
      .attr('x1', tlength)
      .attr('y1', innerHeight/2 + 2 * r2)
      .attr('x2', 2 * tlength + 2 * r1)
      .attr('y2', innerHeight/2 + 2 * r2);
    // right lil line
    svg.append("line")
      .attr("class", "blackline")
      .attr('x1', 2 * tlength + 2 * r1)
      .attr('y1', innerHeight/2 + 2 * r2 - r1)
      .attr('x2', 2 * tlength + 2 * r1)
      .attr('y2', innerHeight/2 + 2 * r2 + r1);
    svg.append("circle")
      .attr("class", "endpoints")
      .attr("cx", 2 * tlength + 2 * r1) //x posiion plus radius
      .attr("cy", innerHeight/2 + 2 * r2)
      .attr("r", r1);
    
    // 60 days after OPT
    // dotted 60 days line
    svg.append("line")
      .attr("class", "dottedline")
      .attr('x1', 2.1 * tlength)
      .attr('y1', innerHeight/2 + 2 * r2)
      .attr('x2', 2.1 * tlength + 2 * r2) // 2.21 line length
      .attr('y2', innerHeight/2 + 2 * r2);
    // right most lil line
    svg.append("line")
      .attr("class", "blackline")
      .attr('x1', 2.1 * tlength + 2 * r2)
      .attr('y1', innerHeight/2 + 2 * r2 - r1)
      .attr('x2', 2.1 * tlength + 2 * r2) // 2.21 line length
      .attr('y2', innerHeight/2 + 2 * r2 + r1);
    svg.append("circle")
      .attr("class", "endpoints")
      .attr("cx", 2.1 * tlength + 2 * r2) //x posiion plus radius
      .attr("cy", innerHeight/2 + 2 * r2)
      .attr("r", r1);
    
  
    /* Way too many tooltips:
     there SHOULD be an easier way...we need to
     update the tooltip text depending on the id of 
     the svg element selected...how do we do this???
    */
          
    let tooltip =  d3.select('div#canvas')
      .append('div')
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", 'hidden');
    
    //start application tooltip
    d3.select('g#plot-area')
      .select('circle#ninetydays')
      .on('mouseover', function(){return tooltip.style("visibility", "visible");})
      .on('mousemove', function(){ return d3.select('.tooltip')
          .html("Take about a week before this date "+
          "to collect your documents so you can "+
          "mail them to USCIS <strong>on this date.</strong> "+
          "Prime time for USCIS to receive your application "+
          "is between now and graduation.");})
      .on("mouseleave", function(){return tooltip.style("visibility", "hidden");});

    //OPT Start Tooltip
    d3.select('g#plot-area')
    .selectAll('rect#tp')
    .on('mouseover', function(){return tooltip.style("visibility", "visible");})
    .on('mousemove', function(){ return d3.select('.tooltip')
        .html("You can request any start date that is within 60 days from your program end date (graduation). You can only start working once you have your EAD card in hand, and on or after the start date your EAD card specifies.");})
    .on("mouseleave", function(){return tooltip.style("visibility", "hidden");});
    
    //during opt tooltip
    d3.select('g#plot-area')
      .selectAll('line#optline')
      .on('mouseover', function(){return tooltip.style("visibility", "visible");})
      .on('mousemove', function(){ return d3.select('.tooltip')
          .html("During this time, you can: </br> 1. Work <br/> 2. Transfer SEVIS record for grad school");})
      .on("mouseleave", function(){return tooltip.style("visibility", "hidden");});

// function show(){
// let mouseLoc = d3.mouse(this)
// d3.select('.tooltip')
//   .html("During this time, you can: </br> 1. Work <br/> 2. Transfer SEVIS record for grad school")
//   .style('visibility', 'visible')
//   .style('left', mouseLoc[0] + margins.left + 'px')
//   .style('top', mouseLoc[1] + 'px')
// }

// function show1(){
//   let mouseLoc = d3.mouse(this)
//   d3.select('.tooltip')
//     .html("Take about a week before this date <br/>"+
//           "to collect your documents so you can <br/>"+
//           "mail them to USCIS <strong>on this date.</strong><br/>"+
//           "Prime time for USCIS to receive your application <br/>"+
//           "is between now and graduation.")
//     .style('visibility', 'visible')
//     .style('left', mouseLoc[0] + margins.left + 'px')
//     .style('top', mouseLoc[1] + 'px')
//   }


