import React from 'react'
import { connect } from 'react-redux'
import d3 from 'd3'
import Legend from './Legend.js'
import PrecinctMap from './PrecinctMap.js'
import Slider from './Slider.js'
import ViolationInput from './ViolationInput.js'

const mapStateToProps = state => ({
    currentYear: state.currentYear,
    currentViolation: state.currentViolation,
})

class UI extends React.Component {
    constructor(props) {
        super(props);
        this.id = "UI";
        this.allViolations = [...new Set(props.violationData.map(row => row.Violation))].sort();
    }

    render() {
        const { currentViolation, currentYear, violationData } = this.props;

        const violationMax = violationData.find(row => row.Violation === currentViolation).Max;

        const precinctToCurrentYearViolations = violationData.reduce( (precinctObj, row) =>
            row.Violation === currentViolation ?
            {...precinctObj, [row.Precinct]: row[currentYear]} :
            precinctObj,
            {}
        )

        const quantize = d3.scale.quantize()
              .domain([0, violationMax])
              .range(d3.range(9).map(i => "q" + i));

        return (<div id={this.id}>
                <ViolationInput violations={this.allViolations} />
                <Legend quantize={quantize} />
                <PrecinctMap
                    violationData={precinctToCurrentYearViolations}
                    quantize={quantize}
                    precinctJson={this.props.precinctJson}
                />
                <Slider
                    firstYear={this.props.firstYear}
                    lastYear={this.props.lastYear}
                    currentYear={this.props.currentYear}
                />
                </div>);
    }
};

export default connect(mapStateToProps)(UI);
