import React, { Component } from "react";
import NavItem from "./navItem";
import {Link} from 'react-router-dom';


export default class Nav extends Component {

    render() {
        return (
            <div className="nav">
                <Link to="/" ><img alt="JoshuaDotWorks logo" className="logo" src="/icons/jg_dark512.png" /></Link>
                <div className="navItems">
                    <NavItem label="HOME" page="/" />
                    <NavItem label="RESUME" page="/resume" />
                    <NavItem label="PROJECTS" page="/projects" />
                    {/*<NavItem label="BLOG" page="/blog" />*/}
                    <NavItem label="CONTACT" page="/contact" />
                </div>
            </div>
        )
    }

}