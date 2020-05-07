import React, {Component} from "react";

export default class Shell extends Component {

    render() {
        return(
            <div className="shell">
                {this.props.children}
            </div>
        )
    }
}