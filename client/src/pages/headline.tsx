import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SandDropper from '../components/gamelets/SandDropper/sandDropper';

export default class Headline extends Component {

    render () {
        return (
            <div className="headline">
                <SandDropper height={192} frequency={8} grain={3}/>
                <h1>
                    <strong>Joshua Grant</strong> is a <strong>developer</strong>, <strong>writer</strong> and <strong>designer </strong> working in Toronto and online.
                </h1>
                Check out my <Link to="/resume">resume</Link> or <Link to="/contact">contact me</Link>  here.
            </div>
        )
    }
                     
}