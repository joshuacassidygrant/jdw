import React, {Component} from 'react';
import {Link} from 'react-router-dom';

type NavItemProps = {
    page: string,
    label: string
}

export default class NavItem extends Component<NavItemProps> {

    render() {
        return (
            <Link to={this.props.page}>
                {this.props.label}
            </Link>
        )
    }
}