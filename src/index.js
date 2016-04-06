'use strict';

import d3 from 'd3';
import d3_queue from 'd3-queue';
import chroniton from 'chroniton';

var width = window.innerWidth,
    height = window.innerHeight;

var svg = d3.select("body").append("svg")
    .attr("width", width * .7)
    .attr("height", height * .7);

var slider = d3.select("body").append("slider");

var numById = {};
var years = [
    "CY2007",
    "CY2008",
    "CY2009",
    "CY2010",
    "CY2011",
    "CY2012",
    "CY2013",
    "CY2014",
    "2015 YTD 03/31"
];
var yearMap = {
    "2007": years[0],
    "2008": years[1],
    "2009": years[2],
    "2010": years[3],
    "2011": years[4],
    "2012": years[5],
    "2013": years[6],
    "2014": years[7],
    "2015": years[8]
}

var currentYear = years[0];
var currentViolation = "URINATING IN PUBLIC";

var projection = d3.geo.mercator()
    .center([-73.94, 40.70])
    .scale(50000)
    .translate([(width) / 2, (height)/2]);

var path = d3.geo.path()
    .projection(projection);

var maxByViolation = {};
d3_queue.queue()
    .defer(d3.json, "data/police_precincts.geojson")
    .defer(d3.csv, "data/clean-summons-data.csv", row => {
        for(var year of years) {
            numById[year + parseInt(row.Precinct) + row.Violation] = row[year];
            maxByViolation[row.Violation] = row.Max;
        }
    })
    .await(ready);

function quantizeMax(max) {
    return d3.scale.quantize()
        .domain([0, max])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
}

function update(precincts) {
    svg.append("g")
        .attr("id", "precincts")
        .selectAll(".precinct")
        .data(precincts.features)
        .enter().append("path")
        .attr("class", "precinct")
        .attr("class", d => {
            var numViolations = numById[currentYear + parseInt(d.properties.Precinct) + currentViolation];
            var quantize = quantizeMax(maxByViolation[currentViolation]);
            return quantize(numViolations);
        })
        .attr("d", path);
}

function ready(error, precincts) {
    if (error) throw error;

    update(precincts);

    slider.append("foo")
        .call(
            chroniton()
                .domain([new Date(2007, 1, 1), new Date(2015, 1, 1)])
                .labelFormat(date => { yearMap[date.getFullYear()] })
                .width(width / 2)
                .on("change", date => {
                    var newYear = yearMap[date.getFullYear()];
                    if (newYear != currentYear) {
                        currentYear = newYear;
                        svg.selectAll("path").remove();
                        update(precincts);
                    }
                })
                .loop(true)
        );
}
