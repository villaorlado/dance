function makeChart(joint){
// Set the dimensions of the canvas / graph
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
    .orient("bottom").ticks(10);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10);

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
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/" + character + ".csv", function(error, data) {
    data.forEach(function(d) {
        d.angle = +d["rwristx"];
        d.angle2 = +d["lwristx"];
    });

    // Scale the range of the data
    y.domain(d3.extent(data, function(d) { return d.angle2; }));
    x.domain([0, rownumber]);

    // Add the valueline path.
    /*svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));
    */

    // Add the scatterplot
    var counter = 0;
    var counter2 = 0;
    svg.selectAll("dot")
        .data(data)
      .enter().append("circle")
        .attr("r", 2)
        .attr("id", function(d) {
          counter += 1;
          return "gato" + counter;
        })
        .on('click',function(d,i){

          videoTime =  parseInt(this.id.split("gato")[1])/100;
          console.log(videoTime);
          goDance(videoTime);

        })
        .attr("cy", function(d) { return y(d.angle); })
        .attr("cx", function(d) {
          counter2 += 1;
          return x(counter2);
        });

      // Add the second scatterplot
      var counter = 0;
      var counter2 = 0;
      svg.selectAll("dot")
            .data(data)
          .enter().append("circle")
            .attr("r", 2)
            .attr("class","second")
            .attr("id", function(d) {
              counter += 1;
              return "gato" + counter;
            })
            .on('click',function(d,i){

              videoTime =  parseInt(this.id.split("gato")[1])/100;
              console.log(videoTime);
              goDance(videoTime);

            })
            .attr("cy", function(d) { return y(d.angle2); })
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

var gato = 0;

function myTimer() {
    $("#gato" + gato).css("fill","red");
    if (gato < rownumber ){
      gato += 1;
    }else{
      gato = 0;
      $(".dot").css("fill","black");
    }
    console.log(gato);
}
}
