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
        var max = 0;

        const violationsByPrecinct = _.reduce(
            this.props.violationData,
            (acc, row) => {
                if (row.Violation == currentViolation) {
                    const numViolations = row[currentYear],
                          precinct = parseInt(row.Precinct).toString();

                    max = Math.max(max, numViolations);
                    _.extend(acc, { [precinct] : numViolations });
                }

                return acc;
            },
            {}
        );

        return {
            violationsByPrecinct: violationsByPrecinct,
            max: max,
        };
    }

    render() {
        return (<div>
                <PrecinctMap violationData={this.state.violationSubset} violationMax={this.state.violationMax} precinctJson={this.props.precinctJson} />
               </div>);
    }
};
