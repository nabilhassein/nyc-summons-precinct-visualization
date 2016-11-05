import React from 'react'
import d3 from 'd3'

export default class PrecinctMap extends React.Component {
    constructor() {
        super();
        this.id = "PrecinctMap";
        this.precinctClass = "precinct";
    }

    render() {
        return <div id={this.id} style={{"overflow": "visible"}} />;
    }

    componentDidMount() {
        const width = window.innerWidth * .8,
              height = window.innerHeight * .65,
              id = this.id,
              precinctClass = this.precinctClass,
              features = this.props.precinctJson.features;

        this.svg = d3.select("#" + id).append("svg")
            .attr("overflow", "visible");

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
        const precinctClass = this.precinctClass,
              numViolations = precinct => newProps.violationData[precinct] || 0,
              precinctTitle = precinct => `Precinct: ${precinct}\nViolations: ${numViolations(precinct)}`;

        this.svg
            .selectAll("." + precinctClass)
            .attr("class", d => newProps.quantize(numViolations(d.properties.Precinct)) + " " + precinctClass);

        this.svg
            .selectAll("." + precinctClass)
            .select("title").remove();

        this.svg
            .selectAll("." + precinctClass)
            .append("svg:title").text(d => precinctTitle(d.properties.Precinct));
    }
}
