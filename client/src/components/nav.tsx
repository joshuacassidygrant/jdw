import React, { Component } from "react";
import NavItem from "./navItem";


export default class Nav extends Component {

    render() {
        return (
            <div className="nav">
                <img alt="JoshuaDotWorks logo" className="logo" src="/jg_dark512.png" />
                <div className="navItems">
                    <NavItem label="HOME" page="/" />
                    <NavItem label="RESUME" page="/resume" />
                    <NavItem label="PROJECTS" page="/projects" />
                    <NavItem label="BLOG" page="/blog" />
                    <NavItem label="CONTACT" page="/contact" />
                </div>
            </div>
        )
    }

}