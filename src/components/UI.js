import React from 'react'
import { connect } from 'react-redux'
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
            ([precinctObj, oldMax], row) => {
                if (row.Violation === currentViolation) {
                    const numViolations = row[currentYear],
                          newMax = Math.max(numViolations, oldMax);

                    return [{...precinctObj, [row.Precinct]: numViolations}, newMax];
                }

                return [precinctObj, oldMax];
            },
            [{}, 0]
        );
    }

    render() {
        const [violationSubset, violationMax] =
            this.getViolationData(this.props.currentViolation, this.props.currentYear);

        return (<div id={this.id}>
                <Legend violationMax={violationMax} />
                <PrecinctMap violationData={violationSubset} violationMax={violationMax} precinctJson={this.props.precinctJson} />
                <Slider firstYear={this.props.firstYear} lastYear={this.props.lastYear} currentYear={this.props.currentYear} />
                <ViolationInput violations={this.props.allViolations} />
                </div>);
    }
};

export default connect(mapStateToProps)(UI);
