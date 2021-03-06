function makeChart(joint1,joint2){
// Set the dimensions of the canvas / graph

joint1_text = joint1.replace("_"," (").replace("L","Left ").replace("R","Right ").replace("Angles","") + ")";
joint2_text = joint2.replace("_"," (").replace("L","Left ").replace("R","Right ").replace("Angles","") + ")";

var margin = {top: 30, right: 20, bottom: 50, left: 50},
    width = 550 - margin.left - margin.right,
    height = 370 - margin.top - margin.bottom;

// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(15);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10);

// Adds the svg canvas
var svg = d3.select("#chartdiv")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/rom.csv", function(error, data) {
    data.forEach(function(d) {
        d.joint1 = +d[joint1];
        d.joint2 = +d[joint2];
    });

    xExtent = d3.extent(data, function(d) { return d.joint1; });
    x.domain([xExtent[0]-10,xExtent[1]+10]);
    yExtent = d3.extent(data, function(d) { return d.joint2; });
    y.domain([yExtent[0]-10,yExtent[1]+10]);


    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 4)
        .attr("cx", function(d) {
          return x(d.joint1);
        })
        .attr("cy", function(d) { return y(d.joint2); })
        .attr("class", function(d) { return d.name; })

    svg.selectAll("text")
          .data(data)
          .enter().append("text")
          .attr("x", function(d) {return x(d.joint1) + 7; })
          .attr("y", function(d) {return y(d.joint2); })
          .text(function(d){
            return d.name;
          })
          .attr("class", function(d) { return d.name; })

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("text")      // text label for the x axis
    .attr("x", width / 2 )
    .attr("y",  height - 15+ margin.bottom)
        .style("text-anchor", "middle")
        .text(joint1_text);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(joint2_text);

});
}
