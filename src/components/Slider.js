import React from 'react'
import { connect } from 'react-redux'
import d3 from 'd3'

const mapDispatchToProps = dispatch => ({
    onSlide: newYear => dispatch({
        type: "UPDATE_YEAR",
        currentYear: newYear,
    })
})

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.id = "Slider";
    }

    render() {
        return (<input
                    id={this.id}
                    type={"range"}
                    min={this.props.firstYear}
                    max={this.props.lastYear}
                    value={this.props.currentYear}
                    onChange={event => this.props.onSlide(event.target.value)}
                />);
    }
};

export default connect(undefined, mapDispatchToProps)(Slider);
