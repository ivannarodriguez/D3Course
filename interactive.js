// Margin Convention
let margins = { top: 20, right: 25, bottom: 30, left: 40 }
let svgouterWidth = 800
let svgouterHeight = 350
let innerWidth = svgouterWidth - margins.left - margins.right
let innerHeight = svgouterHeight - margins. top - margins.bottom

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
