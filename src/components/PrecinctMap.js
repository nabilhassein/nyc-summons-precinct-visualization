import React from 'react'
import { connect } from 'react-redux'
import d3 from 'd3'

const mapStateToProps = state => {
    return {
        currentPrecinct: state.currentPrecinct,
        mouseX: state.mouseX,
        mouseY: state.mouseY,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        mouseover: (precinct, mouseX, mouseY) => {
            dispatch({
                type: "PRECINCT_HOVER",
                currentPrecinct: precinct,
                mouseX: mouseX,
                mouseY: mouseY,
            })
        },
        mouseout: () => {
            dispatch({
                type: "PRECINCT_UNHOVER",
            })
        },
    }
}


class PrecinctMap extends React.Component {
    constructor() {
        super();
        this.id = "PrecinctMap";
        this.precinctClass = "precinct";
        this.tooltipRectClass = "d3-tooltip-rect";
        this.tooltipTextClass = "d3-tooltip-text";
    }

    render() {
        return <div id={this.id} />;
    }

    componentDidMount() {
        const width = window.innerWidth * .8,
              height = window.innerHeight * .65,
              id = this.id,
              precinctClass = this.precinctClass,
              features = this.props.precinctJson.features,
              mouseover = this.props.mouseover,
              mouseout = this.props.mouseout;

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
            .on("mouseover", e => {
                const [x, y] = d3.mouse(this.svg[0][0]);
                mouseover(e.properties.Precinct, x, y);
            })
            .on("mouseout", e => mouseout())
            .classed(precinctClass, true);

        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        const precinctClass = this.precinctClass;

        const quantize = d3.scale.quantize()
              .domain([0, newProps.violationMax])
              .range(d3.range(9).map(i => "q" + i));

        this.svg
            .selectAll("." + precinctClass)
            .attr("class", d => {
                const numViolations = newProps.violationData[d.properties.Precinct.toString()];
                return quantize(numViolations) + " " + precinctClass;
            });

        this.drawTooltip(newProps.currentPrecinct, newProps.violationData, newProps.mouseX, newProps.mouseY);
    }

    drawTooltip(selectedPrecinct, violationData, mouseX, mouseY) {
        if (selectedPrecinct) {
            const tooltipRectClass = this.tooltipRectClass,
                  tooltipTextClass = this.tooltipTextClass,
                  xOffset = 42,
                  yOffset = 25;

            const g = this.svg.append("g")
                  .attr('x', mouseX)
                  .attr('y', mouseY);

            const tooltipText = g.selectAll("." + tooltipTextClass)
                  .data([selectedPrecinct]);

            const text1 = tooltipText.enter().append('text')
                .attr('class', tooltipTextClass)
                .attr('x', mouseX + xOffset)
                .attr('y', mouseY + yOffset)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .text("Precinct: " +  selectedPrecinct);

            const text2 = tooltipText.enter().append('text')
                .attr('class', tooltipTextClass)
                .attr('x', mouseX + xOffset)
                .attr('y', mouseY + yOffset * 2)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .text("Violations: " + (violationData[selectedPrecinct] || 0));

            tooltipText.exit().remove();

            const bbox1 = text1.node().getBBox();
            const bbox2 = text2.node().getBBox();

            const tooltipRect = g.selectAll("." + tooltipRectClass)
                  .data([selectedPrecinct]);

            tooltipRect.enter().append("rect")
                .attr("class", tooltipRectClass)
                .attr("height", bbox2.height * 3)
                .attr("width", bbox2.width)
                .attr('x', bbox2.x)
                .attr('y', bbox1.y)
                .style("fill", "yellow")
                .style("fill-opacity", ".3");

            tooltipRect.exit().remove();
        } else {
            d3.select("#" + this.id).select("svg").selectAll("g").remove();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrecinctMap);
