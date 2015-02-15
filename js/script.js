
// 1. This section sets the margins for the chart itself. For example if I change the top margin to 0 instead of 20 the chart will be drawn starting where the published date line ends (there won't be any space there anymore.) The width and height of the chart are also defined here. It is important to note that the size is defined with the margins in mind. The chart itself isn't 500 px in height, it's 500 minus the 50 in margins.
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// 2. x and y are the distance from the (0,0) coordinate that the chart is drawn. If you change x to 10, for example, the bars will be drawn further to the right on the graph. If you change the y axis to 10 the bars will be drawn further down the page.
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

// 3. The words on each axis are defined by "orient" if you change it to orient right on the y axis, the percentages show up on the right side of the line itself. "Ticks" determines how many tick marks break up the chart. 
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");
// 4. This shows up as an array in the browser inspector.
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("js/baseball_card.json", function(error, data) {
  
  console.log(data);
// 5. this sets the units for the axes, so the x axis is the year and the y axis is Homeruns.
  x.domain(data.stats.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data.stats, function(d) { return d.H; })]);
// 6. this appends (combines) the attributes of the axis labels. It defines where they go, what they say and what they look like.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
// This defines the attributes of the bars themselves: shape, size, where the data pulls from. This is different because it doesn't pull divs from the html and append them to each other, instead it does things as an array.
  svg.selectAll(".bar")
      .data(data.stats)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.H); })
      .attr("height", function(d) { return height - y(d.H); });

});







