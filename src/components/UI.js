import React from 'react'
import { connect } from 'react-redux'
import PrecinctMap from './PrecinctMap.js'
import Slider from './Slider.js'

const mapStateToProps = state => {
    return {
        currentYear: state.currentYear
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
                <PrecinctMap violationData={violationSubset} violationMax={violationMax} precinctJson={this.props.precinctJson} />
                <Slider currentYear={this.props.currentYear} />
                </div>);
    }
};

export default connect(mapStateToProps)(UI);
