import React from 'react'
import { connect } from 'react-redux'
import d3 from 'd3'
import d3_legend from 'd3-svg-legend'

export default class Legend extends React.Component {
    constructor() {
        super();
        this.id = "Legend";
        this.legendClass = "legendQuant";
    }

    render() {
        return <div id={this.id} />;
    }

    componentDidMount() {
        const width = window.innerWidth * .5,
              height = window.innerHeight * .2,
              id = this.id;

        this.svg = d3.select("#" + id).append("svg")
            .attr("width", width)
            .attr("height", height);

        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        const legendClass = this.legendClass;

        const quantize = d3.scale.quantize()
              .domain([0, newProps.violationMax])
              .range(d3.range(9).map(i => "q" + i));

        this.svg.append("g")
            .attr("class", legendClass)
            .attr("transform", "translate(20,20)");

        const colorLegend = d3_legend.legend.color()
              .labelFormat(d3.format("f"))
              .useClass(true)
              .scale(quantize);

        this.svg.select("." + legendClass)
            .call(colorLegend);
    }
}
