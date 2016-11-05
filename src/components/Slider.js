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
        return (<div id={this.id} className="inline">
            <output type={"text"} className="margin-right">Selected year: {this.props.currentYear}</output>
            <output type={"text"}> {this.props.firstYear} </output>
            <input
                    type={"range"}
                    min={this.props.firstYear}
                    max={this.props.lastYear}
                    value={this.props.currentYear}
                    onChange={event => this.props.onSlide(event.target.value)}
            />
            <output type={"text"}> {this.props.lastYear} </output>
        </div>);
    }
};

export default connect(undefined, mapDispatchToProps)(Slider);
