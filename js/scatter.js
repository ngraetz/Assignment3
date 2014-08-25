// Exercise 4
// Width and height settings
var settings = {
  width:900, 
  height:400, 
  radius:7,
  padding:150
}

// DEFINE SCALES
// X Axis
var xValues = data_inpatient.map(function(d) {return d.ncode})
var xMin = d3.min(xValues)
var xMax = d3.max(xValues)

var xScale = d3.scale.linear().domain([xMin, xMax]).range([settings.radius, settings.width - settings.radius])

// Y Axis
var yMin = d3.min(data_inpatient, function(d){return d.mean})
var yMax = d3.max(data_inpatient, function(d){return d.mean})

// Define the yScale
var yScale = d3.scale.linear().domain([yMin, yMax]).range([settings.height - settings.radius,settings.radius])
/*
var ylabelsFunction = function(text) {
  text.attr("x", function(d) {return xScale(d.ncode)})
  .attr("y", function(d) {return settings.height-yScale(d.mean)})
  .attr("class", "y-label")
   .text(function(d) {return d.mean})
}
*/
// Rect function
var rectFunction = function(rect) {
  rect.attr('x', function(d) {return xScale(d.ncode)})
  .attr("y", function(d) {return settings.height-yScale(d.mean)})
  .attr("height", function(d) {return yScale(d.mean)})
   .attr("width", 10)
}

var mySvg = d3.select("#my-svg")

// append a "g" element to hold your circles 
var myG = d3.select('#my-svg')
  .append('g')
  .attr('id', 'my-g')
  .attr('transform', 'translate(' + settings.padding + ','+ settings.padding + ')')

// Append circles
   // var rects = myG.selectAll('rect')
   //.data(data1)
   //.enter().append('rect').call(rectFunction)

// X-Axis function
var xAxisFunction = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .ticks(48)
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
	
// Axis labels	
xvartitle = "N-code"
var xaxislabel = d3.select('#my-g').append("text").attr("class", "label").attr('transform', 'translate(' + settings.width/2 + ',' + 450 + ')').text(xvartitle)

yvartitle = "Probability"
var yaxislabel = d3.select('#my-g').append("text").attr("class", "label").attr('transform', 'translate(' + -75 + ',' + settings.height/2 + ') rotate(270)').text(yvartitle)

var update = function(data) {
    var rects = myG.selectAll('rect').data(data, function(d){return d.ncode})
	rects.exit().remove()
	
	rects.enter().append('rect').call(rectFunction)
	rects.transition().duration(1000).call(rectFunction)
}

update(data_inpatient)

// Legend function
/*
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
}*/