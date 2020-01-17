// Margin Convention
let margins = { top: 20, right: 25, bottom: 30, left: 40 }
let svgouterWidth = 450
let svgouterHeight = 450
let innerWidth = 450 - margins.left - margins.right
let innerHeight = 450 - margins.top - margins.bottom

//append svg to the body of the page
let svg = d3.select('div#canvas svg#chart')
            .attr('width', svgouterWidth)
            .attr('height', svgouterHeight)
            .append('g')
              .attr('id', "plot-area")
              .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'
              .append('label');
