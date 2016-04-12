import React from 'react';
import d3 from 'd3';

export default class PrecinctMap extends React.Component {
    constructor() {
        super();
        this.id = "PrecinctMap";
    }

    render() {
        return <div id={this.id} />;
    }

    componentWillReceiveProps(newProps) {
        this.svg
            .selectAll(".precinct")
            .attr("class", d => {
                const numViolations = newProps.violationData[d.properties.Precinct.toString()],
                      quantize = d3.scale.quantize()
                        .domain([0, newProps.violationMax])
                        .range(d3.range(9).map(i => "q" + i + "-9"));

                return quantize(numViolations) + " precinct";
            });

        // instead of attr and class, use style and fill with rbg directly
    }

    componentDidMount() {
        const width = window.innerWidth,
              height = window.innerHeight * .9;

        const id = this.id;

        this.svg = d3.select("#" + id).append("svg")
            .attr("width", width)
            .attr("height", height);

        const projection = d3.geo.mercator()
            .center([-73.94, 40.70])
            .scale(50000)
            .translate([width/2, height/2]);

        const path = d3.geo.path()
            .projection(projection);

        const features = this.props.precinctJson.features,
              violationData = this.props.violationData,
              violationMax = this.props.violationMax;

        this.svg
            .selectAll(".precinct")
            .data(features)
            .enter().append("path")
            .attr("class", "precinct")
            .attr("d", path)
            .attr("class", d => {
                const numViolations = violationData[d.properties.Precinct.toString()],
                      quantize = d3.scale.quantize()
                        .domain([0, violationMax])
                        .range(d3.range(9).map(i => "q" + i + "-9"));

                return quantize(numViolations) + " precinct"; // learn to use d3 classed instead of this
            });
    }
}
