import React, { Component } from "react";
import NavItem from "./navItem";


export default class Nav extends Component {

    render() {
        return (
            <div className="nav">
                <img alt="JoshuaDotWorks logo" className="logo" src="/jg_dark512.png" />
                <div className="navItems">
                    <NavItem label="HOME" page="" />
                    <NavItem label="RESUME" page="" />
                    <NavItem label="PROJECTS" page="" />
                    <NavItem label="BLOG" page="" />
                    <NavItem label="CONTACT" page="" />
                </div>
            </div>
        )
    }

}