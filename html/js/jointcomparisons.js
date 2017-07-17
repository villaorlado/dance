function makeChart(joint){
// Set the dimensions of the canvas / graph

$("#graphinfo").html("Showing all styles for "+joint);

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

d3.csv("data/all.csv", function(error, data) {
    data.forEach(function(d) {
        d.luruh = +d["luruh_"+joint];
        d.lanyap = +d["lanyap_"+joint];
        d.gagah = +d["gagah_"+joint];
        d.wanara = +d["wanara_"+joint];
        d.jatayu = +d["jatayu_"+joint];
        d.raksasa = +d["raksasa_"+joint];
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
    extentArray[0] = extentArray[0] - 10;
    extentArray[1] = extentArray[1] + 10;
    y.domain(extentArray);
    x.domain([0, 500]);

    //max and min info.
    var dataSet  = [];
    var characterTypes = "luruh,lanyap,gagah,wanara,jatayu,raksasa".split(",");
    //var characterColors = {lanyap"luruh":blue,red,green,pink,brown}
    counter = 0;
    characterTypes.forEach(function(item,index){
      var extent = d3.extent(data, function(d) { return d[item]; });
      dataSet[index] = [item,extent[0],extent[1],extent[1]-extent[0]];
    });
    table = $("#linktableDisguised").DataTable({
      data:dataSet,"order": [[ 3, "desc" ]],
      "createdRow": function( row, data, dataIndex ) {
        switch ( data[0]) {
          case "luruh": $(row).css('color','blue'); break;
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
      $("."+data[0]).css("opacity","1");
      $("."+data[0]).css("stroke-width","3");
    });

    $('#linktableDisguised tbody').on('click', 'tr', function () {
      var data = table.row(this).data();
      window.location = data[0] + '.html';
    });

    $('#linktableDisguised tbody').on('mouseout', 'tr', function () {
      $(".characterLines").css("opacity","0.5");
      $(".characterLines").css("stroke-width","1");
    });
    // Add the valueline path.
    /*
    svg.append("path")
        .attr("class", "luruh")
        .attr("d", luruhline(data));

    svg.append("path")
        .attr("class", "lanyap")
        .attr("d", lanyapline(data));

    svg.append("path")
        .attr("class", "gagah")
        .attr("d", gagahline(data));

    svg.append("path")
        .attr("class", "wanara")
        .attr("d", wanaraline(data));

    svg.append("path")
        .attr("class", "jatayu")
        .attr("d", jatayuline(data));

    svg.append("path")
        .attr("class", "raksasa")
        .attr("d", raksasaline(data));
    */

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

    plotJoint("gagah");
    plotJoint("luruh");
    plotJoint("lanyap");
    plotJoint("wanara");
    plotJoint("raksasa");
    plotJoint("jatayu");

    /*  // Add the second scatterplot
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
            .attr("cy", function(d) { return y(d.lanyap); })
            .attr("cx", function(d) {
              counter2 += 1;
              return x(counter2);
            });
            */
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
