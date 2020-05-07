import React, {Component} from 'react';

type NavItemProps = {
    page: string,
    label: string
}

export default class NavItem extends Component<NavItemProps> {

    render() {
        return (
            <a className="navItem" href={this.props.page}>
                {this.props.label}
            </a>
        )
    }
}