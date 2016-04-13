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
        const yearMap = {
            "2007": "CY2007",
            "2008": "CY2008",
            "2009": "CY2009",
            "2010": "CY2010",
            "2011": "CY2011",
            "2012": "CY2012",
            "2013": "CY2013",
            "2014": "CY2014",
            "2015": "2015 YTD 03/31",
        };

        this.slider = d3.select("#" + id).call(
            chroniton()
                .domain([new Date(2007, 1, 1), new Date(2015, 1, 1)])
                .labelFormat(date => yearMap[date.getFullYear()])
                .width(window.innerWidth / 2)
                .on("change", date => {
                    onSlide(yearMap[date.getFullYear()])
                })
                .loop(true)
        );
    }
};

export default connect(undefined, mapDispatchToProps)(Slider);
