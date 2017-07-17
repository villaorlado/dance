function makeChart(joint, reload){
// Set the dimensions of the canvas / graph
if (reload){
  //svg.remove();
}

var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 550 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var cn = 0;
var valueline = d3.svg.line()
    .y(function(d) { return y(d.angle); })
    .x(function(d) {
      cn+=1;
      return x(cn);
    });

// Adds the svg canvas
var svg = d3.select("#chartdiv")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "jointsthroughtime")
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/all.csv", function(error, data) {
    data.forEach(function(d) {
        d.angle = +d[joint];
    });

    // Scale the range of the data
    jointExtent = d3.extent(data, function(d) { return d.angle; });
    y.domain([jointExtent[0]-10,jointExtent[1]+10]);
    x.domain([0, rownumber]);
    $("#min").html("<b>Min:</b> "+jointExtent[0]);
    $("#max").html("<b>Max:</b> "+jointExtent[1]);
    $("#rom").html("<b>Rom:</b> "+(jointExtent[1]-jointExtent[0]));
    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    var counter = 0;
    var counter2 = 0;
    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", 3)
        .attr("id", function(d) {
          counter += 1;
          return "gato" + counter;
        })
        .attr("class","joint")
        .on('mouseover',function(d,i){
          videoTime =  parseInt(this.id.split("gato")[1])/100;
          var currentAngle = y.invert(d3.mouse(this)[1]);
          console.log(currentAngle);
          goDance(videoTime);
          rotate(currentAngle);
        })
        .attr("cy", function(d) { return y(d.angle); })
        .attr("cx", function(d) {
          counter2 += 1;
          return x(counter2);
        });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});

//var myVar = setInterval(myTimer, 100);
$("svg").on('click',function(d,i){
  playDance();
});

var gato = 0;

function myTimer() {
    $("#gato" + gato).css("fill","red");
    if (gato < 420 ){
      gato += 1;
    }else{
      gato = 0;
      $(".dot").css("fill","black");
    }
}
}
