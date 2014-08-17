// Exercise 4
// Width and height settings
var settings = {
  width:500, 
  height:400, 
  radius:7,
  padding:50
}

// DEFINE SCALES
// X Axis
var xValues = data.map(function(d) {return d.ex_1960})
var xMin = d3.min(xValues)
var xMax = d3.max(xValues)
// Y Axis
var yMin = d3.min(data, function(d){return d.ex_2012})
var yMax = d3.max(data, function(d){return d.ex_2012})

// Define the xScale
var xScale = d3.scale.linear().domain([xMin, xMax]).range([settings.radius, settings.width - settings.radius])

// Define the yScale
var yScale = d3.scale.linear().domain([yMin, yMax]).range([settings.height - settings.radius,settings.radius])

// Color Scale
var colorScale = d3.scale.category10()
// Circle function
var circleFunction = function(circ) {
  circ.attr('cx', function(d) {return xScale(d.ex_1960)})
  .attr('cy', function(d) {return yScale(d.ex_2012)})
  .attr('r', settings.radius)
  .style('fill', function(d) { return colorScale(d.region)})
}

// append a "g" element to hold your circles 
var myG = d3.select('#my-svg')
  .append('g')
  .attr('id', 'my-g')
  .attr('transform', 'translate(' + settings.padding + ','+ settings.padding + ')')

// Append circles
var circles = myG.selectAll('circle')
  .data(data)
  .enter().append('circle').call(circleFunction)

// X-Axis function
var xAxisFunction = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .ticks(4)
// Append axis
var xAxis = d3.select('#my-g').append('g').attr('class', 'axis')
  .attr('transform', 'translate(0,'+ settings.height + ')')
  .call(xAxisFunction)
  
// Y-Axis function
var yAxisFunction = d3.svg.axis()
        .scale(yScale)
        .orient('left')
        .ticks(4)
// Append axis
var yAxis = d3.select('#my-g').append('g').attr('class', 'axis')
    .attr('transform', 'translate(0,0)')
    .call(yAxisFunction)
	
// Legend function
var drawLegend = function() {
	// Get unique list of regions from data
	var regions = []
	data.map(function(d) {
		if(regions.indexOf(d.region) == -1) regions.push(d.region)
	})
	
	// Append a legend G
	legendG = d3.select('#scatter-svg').append('g').attr('id', 'legendG').attr('transform', 'translate(' + (settings.width + 2*settings.padding) + ',' + settings.padding + ')')
	legendG.selectAll('text')
		.data(regions)
		.enter().append('text')
		.text(function(d) {return d})
		.attr('transform', function(d,i) {return 'translate(0, ' + i*20 + ')'})
		.style('fill', function(d) {return colorScale(d)})
}