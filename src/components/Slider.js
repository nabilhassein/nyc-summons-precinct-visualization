import React from 'react'
import { connect } from 'react-redux'
import d3 from 'd3'
import chroniton from 'chroniton'

const mapDispatchToProps = dispatch => {
    return {
        onSlide: newYear => {
            dispatch({
                type: "UPDATE_YEAR",
                currentYear: newYear,
            })
        }
    }
}

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.id = "Slider";
    }

    render() {
        return <div id={this.id} />;
    }

    componentDidMount() {
        const id = this.id,
              onSlide = this.props.onSlide;

        this.slider = d3.select("#" + id).call(
            chroniton()
                .domain([new Date(2007, 1, 1), new Date(2015, 1, 1)])
                .labelFormat(date => date.getFullYear())
                .width(window.innerWidth / 2)
                .on("change", date => onSlide(date.getFullYear().toString()))
                .loop(true)
        );
    }
};

export default connect(undefined, mapDispatchToProps)(Slider);
