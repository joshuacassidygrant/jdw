import React, {Component} from 'react';
import LineDrawer from '../components/lineDrawer';

export default class Headline extends Component {

    render () {
        return (
            <div className="headline">
                <LineDrawer width = {1040} height={256} frequency={50}/>
                <h1>
                    <strong>Joshua Grant</strong> is a <strong>developer</strong>, <strong>writer</strong> and <strong>designer </strong>looking for work in <strong>Toronto</strong> or <strong> online</strong>.
                </h1>
                Check out my resume or contact me here.
            </div>
        )
    }

}