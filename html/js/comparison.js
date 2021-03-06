function makeChart(variable1,variable2){

joint1_text = variable1.replace("_"," ").replace("L"," Left ").replace("R"," Right ").replace("Angles","").replace("_", " (") + ")";
joint1_text = joint1_text[0].toUpperCase() + joint1_text.substring(1);
joint2_text = variable2.replace("_"," ").replace("L"," Left ").replace("R"," Right ").replace("Angles","").replace("_", " (") + ")";
joint2_text = joint2_text[0].toUpperCase() + joint2_text.substring(1);

// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 50, left: 50},
    width = 550 - margin.left - margin.right,
    height = 370 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.scale.linear().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(15);

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

d3.csv("data/all.csv", function(error, data) {
    data.forEach(function(d) {
        d.angle = +d[variable1];
        d.angle2 = +d[variable2];
    });

    // Scale the range of the data
    var extentArray = d3.extent([].concat(data.map(function (d) {
        return (d.angle);
    }), data.map(function (d) {
        return (d.angle2);
    })));
    extentArray[0] = extentArray[0] - 10;
    extentArray[1] = extentArray[1] + 10;
    y.domain(extentArray);
    x.domain([0, 500]);

    //max and min info.
    var variable1extent = d3.extent(data, function(d) { return d.angle; });
    var variable2extent = d3.extent(data, function(d) { return d.angle2; });
    $("#min1").html("Min: " + variable1extent[0]);
    $("#max1").html("Max: " + variable1extent[1]);
    $("#rom1").html("ROM: " + (variable1extent[1]-variable1extent[0]));
    $("#min2").html("Min: " + variable2extent[0]);
    $("#max2").html("Max: " + variable2extent[1]);
    $("#rom2").html("ROM: " + (variable2extent[1]-variable2extent[0]));
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
        .attr("data-legend",joint1_text)
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
            .attr("data-legend",joint2_text)
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


            svg.append("text")      // text label for the x axis
                .attr("x", width / 2 )
                .attr("y",  height - 15+ margin.bottom)
                .style("text-anchor", "middle")
                .text("Time (miliseconds)");


           svg.append("text")
               .attr("transform", "rotate(-90)")
               .attr("y", 0 - margin.left)
               .attr("x",0 - (height / 2))
               .attr("dy", "1em")
               .style("text-anchor", "middle")
               .text("Angles (degree)");

    legend = svg.append("g")
    .attr("transform","translate(300,0)")
      .attr("class","legend")
      .style("font-size","12px")
      .call(d3.legend)

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
