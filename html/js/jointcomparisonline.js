function makeChart(dataSource,joint,xAxisText,yAxisText){
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 60, left: 80},
    width = 550 - margin.left - margin.right,
    height = 390 - margin.top - margin.bottom;

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

// Define the line functions
var luruh = d3.svg.line().interpolate("bundle").x(function(d) {return x(d.number);}).y(function(d) { return y(d.luruh); });
var lanyap = d3.svg.line().interpolate("bundle").x(function(d) {return x(d.number);}).y(function(d) { return y(d.lanyap); });
var gagah = d3.svg.line().interpolate("bundle").x(function(d) {return x(d.number);}).y(function(d) { return y(d.gagah); });
var jatayu = d3.svg.line().interpolate("bundle").x(function(d) {return x(d.number);}).y(function(d) { return y(d.jatayu); });
var wanara = d3.svg.line().interpolate("bundle").x(function(d) {return x(d.number);}).y(function(d) { return y(d.wanara); });
var raksasa = d3.svg.line().interpolate("bundle").x(function(d) {return x(d.number);}).y(function(d) { return y(d.raksasa); });

// Get the data
d3.csv("data/"+dataSource+".csv", function(error, data) {
    var cn = 0;
    data.forEach(function(d) {
		d.number = cn;
        d.luruh = +d["luruh_"+joint];
        d.lanyap = +d["lanyap_"+joint];
        d.gagah = +d["gagah_"+joint];
        d.wanara = +d["wanara_"+joint];
        d.jatayu = +d["jatayu_"+joint];
        d.raksasa = +d["raksasa_"+joint];
        cn += 1;
    });

    // Scale the range of the data
    var extentArray = d3.extent([].concat(
    data.map(function (d) {
        return (d.luruh);
    }),
    data.map(function (d) {
        return (d.lanyap);
    }),
    data.map(function (d) {
        return (d.gagah);
    }),
    data.map(function (d) {
        return (d.wanara);
    }),
    data.map(function (d) {
        return (d.raksasa);
    }),
    data.map(function (d) {
        return (d.jatayu);
    })
    ));
    increment = (extentArray[1]-extentArray[0]) /10;
    extentArray[0] = extentArray[0] - increment;
    extentArray[1] = extentArray[1] + increment;
    y.domain(extentArray);
    
    x.domain([0, 500]);

    //max and min info.
    var dataSet  = [];
    var characterTypes = "luruh,lanyap,gagah,wanara,jatayu,raksasa".split(",");
    counter = 0;
    characterTypes.forEach(function(item,index){
      var extent = d3.extent(data, function(d) { return d[item]; });
      dataSet[index] = [item,extent[0],extent[1],extent[1]-extent[0]];
    });
    table = $("#linktableDisguised").DataTable({
      data:dataSet,"order": [[ 3, "desc" ]],
      "createdRow": function( row, data, dataIndex ) {
        switch ( data[0]) {
          case "luruh": $(row).css('color','steelblue'); break;
          case "lanyap": $(row).css('color','orange'); break;
          case "jatayu": $(row).css('color','red'); break;
          case "raksasa": $(row).css('color','green'); break;
          case "wanara": $(row).css('color','brown'); break;
          case "gagah": $(row).css('color','black'); break;
        }
      }
    });

    $('#linktableDisguised tbody').on('mouseover', 'tr', function () {
      var data = table.row(this).data();
      $(".characterLines").css("opacity","0.1");
      $(".characterLines").css("stroke-width","1");
      $(this).css("cursor","pointer");
      $("#"+data[0]).css("opacity","1");
      $("#"+data[0]).css("stroke-width","2");
    });

    $('#linktableDisguised tbody').on('click', 'tr', function () {
      var data = table.row(this).data();
      window.location = data[0] + '.html';
    });

    $('#linktableDisguised tbody').on('mouseout', 'tr', function () {
      $(".characterLines").css("opacity","0.5");
      $(".characterLines").css("stroke-width","1");
    });
    
    // Add the paths.
    svg.append("path").attr("class", "characterLines").attr("id", "luruh").attr("d", luruh(data));
    svg.append("path").attr("class", "characterLines").attr("id", "lanyap").attr("d", lanyap(data));
    svg.append("path").attr("class", "characterLines").attr("id", "gagah").attr("d", gagah(data));
    svg.append("path").attr("class", "characterLines").attr("id", "wanara").attr("d", wanara(data));
    svg.append("path").attr("class", "characterLines").attr("id", "jatayu").attr("d", jatayu(data));
    svg.append("path").attr("class", "characterLines").attr("id", "raksasa").attr("d", raksasa(data));

    function plotJoint(characterType){
      var counter = 0;
      var counter2 = 0;
      svg.selectAll("dot")
          .data(data)
        .enter().append("circle")
          .attr("r", 1)
          .attr("class", characterType + " characterLines")
          .attr("id", function(d) {
            counter += 1;
            return characterType + counter;
          })
        .attr("cy", function(d) { return y(d[characterType]); })
        .attr("cx", function(d) {
          counter2 += 1;
          return x(counter2);
        });
    };

    //plotJoint("gagah");
    //plotJoint("luruh");
    //plotJoint("lanyap");
    //plotJoint("wanara");
    //plotJoint("raksasa");
    //plotJoint("jatayu");

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
            .text(xAxisText);

       svg.append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 0 - margin.left)
           .attr("x",0 - (height / 2))
           .attr("dy", "1em")
           .style("text-anchor", "middle")
           .text(yAxisText);

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
