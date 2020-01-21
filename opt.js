// const graceDays = 60 //60 days
// const earliestApplication = -90 //-90 days
// const optDuration = 1 // 1 year
// const stemOptDuration = 2 //2 years

// let graduationDate = d3.select('#graduation').property('value')

// let startingdate = d3.select('#startingdate').property('value')

// // let qualifyStem = d3.select('#stemExtension').property('value')

// // Function that recieves graduation date and calculates the date of the 60 day grace
// //period after graduation
// //Recieves string in format year-month-day and returns string in same format
// function gracePeriodEnd (str){
//     var date = new Date(str);
//     var newDate = new Date(date.setDate(date.getDate() + graceDays));
//     var finalNewDate = newDate.toJSON().slice(0,10);
//     return finalNewDate;
// }


// // Function that recieves graduation date and calculates the date of the earliest
// // possible application day
// //Recieves string in format year-month-day and returns string in same format
// function earlyApplicationDate (str){
//     var date = new Date (str);
//     var newDate = new Date(date.setDate(date.getDate()+ earliestApplication));
//     var finalNewDate = newDate.toJSON().slice(0,10);
//     return finalNewDate;
// }


// // Function that recieves starting date and calculates the end date of OPT
// ////Recieves string in format year-month-day and returns string in same format
// function endOPT (str){
//     var date = new Date(str);
//     var dateTemp = new Date(date.setFullYear(date.getFullYear()+ optDuration))
//     var endDate = dateTemp.toJSON().slice(0,10);
//     return endDate;
// }

// let optEndDate = endOPT(startingdate)

// //Function that recieves string with grace period end date and sets the max date on the
// // starting date calendar
// function setGracePeriodEnd (str){
//     d3.select('#startingdate')
//     .property('max', str);
// }

// //Function that recieves string with graduation date and set min date on the starting date
// //calendar
// function setGracePeriodStart (str){
//     d3.select('#startingdate')
//     .property('min', str)
// }

// This function will only work if a student qualifies for OPT. It recieves string with end date
// adds 2 years to the end date
// function stemEndDate (str) {
//   if (qualifyStem === 'Yes') {
//     var date = new Date(str)
//     var stemStartDateTemp = new Date(date.setFullYear(date.getFullYear() + stemOptDuration))
//     var stemStartDate = stemStartDate.toJSON().slice(0,10)
//     return stemStartDate
//   }
//   }
// let stemEnd = stemEndDate(optEndDate)

// This function will only draw a timeline if a stident qualifies for OPT.

/*function stemDrawLine (str) {
//  if qualifyStem === 'Yes' {
//
//  }
}
*/

// Margin Convention
let margins = { top: 20, right: 25, bottom: 30, left: 40 }
let svgouterWidth = 800
let svgouterHeight = 500
let innerWidth = svgouterWidth - margins.left - margins.right
let innerHeight = svgouterHeight - margins.top - margins.bottom
//-90 + 60 timeline length
let tlength = innerWidth/2.5
//radius sizes
let r1 = 15
let r2 = 40

d3.select('div#dropdowns')
    .attr('width', svgouterWidth);
//append svg to the body of the page
let svg = d3.select('div#canvas svg#chart')
            .attr('width', svgouterWidth)
            .attr('height', svgouterHeight)
            .append('g')
              .attr('id', "plot-area")
              .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
      // timeline
      svg.append("line")
        .attr("class", "blackline")
        .attr('x1',0)
        .attr('y1',innerHeight/2)
        .attr('x2',tlength)
        .attr('y2',innerHeight/2);
      //-90 days (leftmost circle)
      svg.append("circle")
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
      //+60 days  (rightmost circle)
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
      //Grad Circle
        svg.append("circle")
          .attr("id", "gradcircle")
          .attr("cx", tlength -  tlength/3)
          .attr("cy", innerHeight/2)
          .attr("r", r2)
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
        svg.append("text")
          .text('USCIS Can Receive your application')
          .attr('class', 'labels')
          .attr('x', tlength/8)
          .attr('y', innerHeight/4.5);
        svg.append("text")
          .text('OPT Starts')
          .attr('class', 'labels')
          .attr('x', tlength-1.8*r2)
          .attr('y', innerHeight/2 + 3 * r2);
        svg.append("text")
          .text('OPT Ends')
          .attr('class', 'labels')
          .attr('x', 1.9 * tlength - r2)
          .attr('y', innerHeight/2 + 3 * r2);

        //One year OPT
        svg.append("circle")
          .attr("class", "endpoints")
          .attr("cx", tlength - r2) //x posiion plus radius
          .attr("cy", innerHeight/2 + 2 * r2)
          .attr("r", r1);
        //left lil line
        svg.append("line")
          .attr("class", "blackline")
          .attr('x1',tlength - r2)
          .attr('y1', innerHeight/2 + 2 * r2 - r1)
          .attr('x2',tlength -r2)
          .attr('y2', innerHeight/2 + 2 * r2 + r1);
        // long line
        svg.append("line")
          .attr("class", "blackline")
          .attr('x1', tlength - r2)
          .attr('y1', innerHeight/2 + 2 * r2)
          .attr('x2', 2 * tlength - r2)
          .attr('y2', innerHeight/2 + 2 * r2);
        // right lil line
        svg.append("line")
          .attr("class", "blackline")
          .attr('x1', 2 * tlength - r2)
          .attr('y1', innerHeight/2 + 2 * r2 - r1)
          .attr('x2', 2 * tlength - r2)
          .attr('y2', innerHeight/2 + 2 * r2 + r1);
        svg.append("circle")
          .attr("class", "endpoints")
          .attr("cx", 2 * tlength - r2) //x posiion plus radius
          .attr("cy", innerHeight/2 + 2 * r2)
          .attr("r", r1);
        // 60 days after OPT
        // long line
        svg.append("line")
          .attr("class", "dottedline")
          .attr('x1', 2 * tlength - r2)
          .attr('y1', innerHeight/2 + 2 * r2)
          .attr('x2', 2.21 * tlength - r2) // 2.21 line length
          .attr('y2', innerHeight/2 + 2 * r2);
        // right most lil line
        svg.append("line")
          .attr("class", "blackline")
          .attr('x1', 2.21 * tlength - r2)
          .attr('y1', innerHeight/2 + 2 * r2 - r1)
          .attr('x2', 2.21 * tlength - r2) // 2.21 line length
          .attr('y2', innerHeight/2 + 2 * r2 + r1);
        svg.append("circle")
          .attr("class", "endpoints")
          .attr("cx", 2.21 * tlength - r2) //x posiion plus radius
          .attr("cy", innerHeight/2 + 2 * r2)
          .attr("r", r1);