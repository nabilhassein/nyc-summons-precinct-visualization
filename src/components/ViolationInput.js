import React from 'react'
import { connect } from 'react-redux'
import Autocomplete from 'react-autocomplete'

const mapDispatchToProps = dispatch => ({
    onEntry: violation => dispatch({
        type: "UPDATE_VIOLATION",
        currentViolation: violation,
    })
})

class ViolationInput extends React.Component {
    constructor(props) {
        super(props);
        this.id = "Autocomplete";
    }

    render() {
        return (<div id={this.id} className="inline margin-right">
                <Autocomplete
                  items={this.props.violations}
                  getItemValue={item => item}
                  labelText="choose a violation "
                  renderItem={(item, isHighlighted) => (<div> {item} </div>)}
                  shouldItemRender={(value, entry) => value.toLowerCase().includes(entry.toLowerCase())}
                  onChange={(e, value) => this.props.violations.includes(value) && this.props.onEntry(value) }
                  onSelect={(e, value) => this.props.onEntry(value)}
                />
                </div>);
    }
}

export default connect(undefined, mapDispatchToProps)(ViolationInput)
