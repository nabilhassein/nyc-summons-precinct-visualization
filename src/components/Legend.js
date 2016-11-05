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
        return (<div id={this.id}>
                    <svg width={window.innerWidth * .5} height={window.innerHeight * .2}>
                        <g className={this.legendClass} />
                    </svg>
                </div>);
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        const colorLegend = d3_legend.legend.color()
              .labelFormat(d3.format("f"))
              .useClass(true)
              .scale(newProps.quantize);

        d3.select("#" + this.id).select("." + this.legendClass)
            .call(colorLegend);
    }
}
