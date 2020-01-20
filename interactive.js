// Margin Convention
let margins = { top: 20, right: 25, bottom: 30, left: 40 }
let svgouterWidth = 800
let svgouterHeight = 400
let innerWidth = svgouterWidth - margins.left - margins.right
let innerHeight = svgouterHeight - margins.top - margins.bottom
//-90 + 60 timeline length
let tlength = innerWidth/2.5
//radius sizes
let r1 = 20
let r2 = 40

d3.select('div#dropdowns')
    .attr('width', svgouterWidth)
    .style('backgrpund-color', "gray");

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
            //Grad Date  
              svg.append("circle")
                .attr("cx", tlength -  tlength/3)
                .attr("cy", innerHeight/2)
                .attr("r", r2)
                .attr("fill", "#97252B")
                .attr("opacity", 0.2);

              
                //dotted lines
                svg.append('rect')
                .attr('class', 'dottedline')
                .attr('x', tlength -  tlength/3 )
                .attr('y', innerHeight/2)
                .attr('width', tlength/3)
                .attr('height', 2 * r2 );




                // svg.append("line")
                //   .attr("class", "dottedline")
                //   .attr('x1',tlength -  tlength/3) 
                //   .attr('y1',innerHeight/2)
                //   .attr('x2',tlength - tlength/3)
                //   .attr('y2',innerHeight/2 + 2 * r2);
                // svg.append("line")
                //   .attr("class", "dottedline")
                //   .attr('x1',tlength) 
                //   .attr('y1',innerHeight/2)
                //   .attr('x2',tlength)
                //   .attr('y2',innerHeight/2 + 2 * r2);
                // svg.append("line")
                //   .attr("class", "dottedline")
                //   .attr('x1',tlength - tlength/3)
                //   .attr('y1',innerHeight/2 + 1.8 * r2)
                //   .attr('x2',tlength)
                //   .attr('y2',innerHeight/2 + 1.8 * r2);
                svg.append("text")
                  .text('Work Start Date')
                  .attr('class', 'labels')
                  .attr('x', tlength -  tlength/3)
                  .attr('y', innerHeight/2 + 2.5 * r2);




              
