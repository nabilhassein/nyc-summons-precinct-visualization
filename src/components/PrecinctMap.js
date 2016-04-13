import React from 'react'
import d3 from 'd3'

export default class PrecinctMap extends React.Component {
    constructor() {
        super();
        this.id = "PrecinctMap";
        this.precinctClass = "precinct";
        this.bucketToColor = {
            q0: "rgb(247,251,255)",
            q1: "rgb(222,235,247)",
            q2: "rgb(198,219,239)",
            q3: "rgb(158,202,225)",
            q4: "rgb(107,174,214)",
            q5: "rgb(66,146,198)",
            q6: "rgb(33,113,181)",
            q7: "rgb(8,81,156)",
            q8: "rgb(8,48,107)",
        };
    }

    render() {
        return <div id={this.id} />;
    }

    componentDidMount() {
        const width = window.innerWidth,
              height = window.innerHeight * .9,
              id = this.id,
              precinctClass = this.precinctClass,
              features = this.props.precinctJson.features;

        this.svg = d3.select("#" + id).append("svg")
            .attr("width", width)
            .attr("height", height);

        const projection = d3.geo.mercator()
            .center([-73.94, 40.70])
            .scale(50000)
            .translate([width/2, height/2]);

        const path = d3.geo.path()
            .projection(projection);

        this.svg
            .selectAll("." + precinctClass)
            .data(features)
            .enter().append("path")
            .attr("d", path)
            .classed(precinctClass, true);

        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        const bucketToColor = this.bucketToColor,
              precinctClass = this.precinctClass;

        this.svg
            .selectAll("." + precinctClass)
            .style("fill", d => {
                const numViolations = newProps.violationData[d.properties.Precinct.toString()],
                      quantize = d3.scale.quantize()
                        .domain([0, newProps.violationMax])
                        .range(d3.range(9).map(i => "q" + i)),
                      bucket = quantize(numViolations);

                return bucketToColor[bucket];
            });
    }
}
