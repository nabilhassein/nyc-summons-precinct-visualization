import React from 'react';
import _ from 'underscore';
import PrecinctMap from './PrecinctMap.js';

export default class UI extends React.Component {
    componentWillMount() {
        const currentViolation = "DISORDERLY CONDUCT",
              currentYear = "CY2007";

        const violationsSubset = this.getViolationData(currentViolation, currentYear);

        this.setState({
            violationSubset: violationsSubset.violationsByPrecinct,
            violationMax: violationsSubset.max,
        });
    }

    getViolationData(currentViolation, currentYear) {
        return this.props.violationData.reduce(
            ([precinctObj, currentMax], row) => {
                if (row.Violation === currentViolation) {
                    const precinct = parseInt(row.Precinct).toString(), // remove double-parse by cleaning data
                          numViolations = row[currentYear],
                          newMax = Math.max(currentMax, numViolations);

                    return [{...precinctObj, [precinct] : numViolations}, newMax];
                }

                return [precinctObj, currentMax];
            },
            [{}, 0]
        );
    }

    render() {
        return (<div>
                <PrecinctMap violationData={this.state.violationSubset} violationMax={this.state.violationMax} precinctJson={this.props.precinctJson} />
               </div>);
    }
};
