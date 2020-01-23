/*
*
* G R A P H I C  
* S T A R T S  H E R E
*
*/

let circledata = [{ x: 0, y: 300, r: 15, group: 'endpoint', html: "Take about a week before this date to collect your documents so you can mail them to USCIS <strong>on this date.</strong> Prime time for USCIS to receive your application is between now and your program end date."}, //-90
                { x: 300, y: 300, r: 30, group: 'grad', html: "This is your program end date. Congrats! You're done with school.", label:'GRAD'},      //grad
                { x: 500, y: 300, r: 15, group: 'endpoint', html: 'If you did not apply for OPT, or graduate school, you must leave the country by this date.'},  //60
                { x: 1000, y: 600, r: 15, group: 'endpoint', html: 'You must terminate all employment by this date (refer to your EAD card), and you will have 60 grace days to leave the country.'}, //optend
                { x: 1200, y: 600, r: 15, group: 'endpoint', html: 'You <strong>must</strong> be out of the country by this date.'}, //opt60
                { x: 900, y: 900, r: 15, group: 'endpoint', html: ''}, //stemstartapplying
                { x: 1200, y: 900, r: 15, group: 'endpoint', html: ''},] //stemstart

let linedata = [{x1: circledata[0].x, x2: circledata[2].x, y1:circledata[0].y, y2:circledata[0].y, group: 'blackline', html:''},
                {x1: circledata[2].x, x2: circledata[3].x, y1:circledata[3].y, y2:circledata[3].y, group: 'blackline', html:'During this time, you can: <br/> 1. Work <br/> 2. Transfer SEVIS record for grad school.'},
                {x1: circledata[3].x, x2: circledata[4].x, y1:circledata[3].y, y2:circledata[3].y, group: 'dottedline', html:''},
                {x1: circledata[1].x, x2: circledata[1].x, y1:circledata[0].y, y2:circledata[3].y, group: 'dottedline', html:''},
                {x1: 0, x2: 0, y1:270, y2:330, group: 'blackline', html:''},
                {x1: 500, x2: 500, y1:270, y2:330, group: 'blackline', html:''},
                {x1: 300, x2: 300, y1:570, y2:630, group: 'blackline', html:''},
                {x1: 500, x2: 500, y1:570, y2:630, group: 'blackline', html:''},
                {x1: 1000, x2: 1000, y1:570, y2:630, group: 'blackline', html:''},
                {x1: 1200, x2: 1200, y1:570, y2:630, group: 'blackline', html:''},
              ]

let rectdata = [{x: circledata[0].x, y: 0, width: 500, height:300, html:'', group:'dottedline'},
                {x: circledata[1].x, y:585, width:200, height:30, html:'You can request any start date that is within 60 days from your program end date (graduation). You can only start working once you have your EAD card in hand, and on or after the start date your EAD card specifies.', group:'endpoint'}
              ]

//adding a margin to the svg
let margin = { top: 200, right: 25, bottom: 30, left: 40 };
let svgWidth = 800;
let svgHeight = 500;
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

let lines = canvas.selectAll('line')
  .data(linedata)
    .enter()
    .append('line')
      .attr('x1', d => xScale(d.x1))
      .attr('x2', d=> xScale(d.x2))
      .attr('y1', d => yScale(d.y1))
      .attr('y2', d=> yScale(d.y2))
      .attr('class', d=> d.group)
      .on('mouseover', showinfo)
      .on('mouseleave', hideinfo);

let circles = canvas.selectAll('circle')
    .data(circledata)
      .enter()
      .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d=> yScale(d.y))
        .attr('r', d=> d.r)
        .attr('class', d=> d.group)
        .on('mouseover', showinfo)
        .on('mouseleave', hideinfo);

let rects = canvas.selectAll('rect')
  .data(rectdata)
  .enter()
  .append('rect')
    .attr('x', d => xScale(d.x))
    .attr('y', d=> yScale(d.y))
    .attr('width', d=> xScale(d.x+d.width)-xScale(d.x))
    .attr('height', d=> yScale(d.y+d.height)-yScale(d.y))
    .attr('class', d=> d.group)
    .on('mouseover', showinfo)
    .on('mouseleave', hideinfo);

let tooltip =  d3.select('body')
      .append('div')
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", 'hidden');
        
function showinfo(d,i){
  d3.select('.tooltip')
    .style("visibility", "visible")
    .html(d.html)
    .style('visibility', d.html.length===0?'hidden':'visible') //only show tooltip when text is available
  d3.select(this)
    .style('fill', d.html.length===0?undefined:'maroon') //only change color when text is available
    .style('stroke', d.html.length===0?undefined:'maroon') //only change color when text is available
}

function hideinfo(d,i){
  d3.select('.tooltip')
  .style("visibility", "hidden")
  d3.select(this)
    .style('fill', undefined)
    .style('stroke', undefined)
}