import React from 'react'
import { connect } from 'react-redux'
import d3 from 'd3'
import Legend from './Legend.js'
import PrecinctMap from './PrecinctMap.js'
import Slider from './Slider.js'
import ViolationInput from './ViolationInput.js'

const mapStateToProps = state => {
    return {
        currentYear: state.currentYear,
        currentViolation: state.currentViolation,
    }
}

class UI extends React.Component {
    constructor(props) {
        super(props);
        this.id = "UI";
    }

    getViolationData(currentViolation, currentYear) {
        return this.props.violationData.reduce(
            (precinctObj, row) => {
                if (row.Violation === currentViolation) {
                    return {...precinctObj, [row.Precinct]: row[currentYear]}
                }

                return precinctObj
            },
            {}
        );
    }

    getViolationMax(currentViolation) {
        for (const row of this.props.violationData) {
            if (row.Violation === currentViolation) {
                return row.Max;
            }
        }
    }

    render() {
        const violationSubset = this.getViolationData(this.props.currentViolation, this.props.currentYear);
        const violationMax = this.getViolationMax(this.props.currentViolation);

        const quantize = d3.scale.quantize()
              .domain([0, violationMax])
              .range(d3.range(9).map(i => "q" + i));

        return (<div id={this.id}>
                <ViolationInput violations={this.props.allViolations} />
                <Legend quantize={quantize} />
                <PrecinctMap violationData={violationSubset} quantize={quantize} precinctJson={this.props.precinctJson} />
                <Slider firstYear={this.props.firstYear} lastYear={this.props.lastYear} currentYear={this.props.currentYear} />
                </div>);
    }
};

export default connect(mapStateToProps)(UI);
