import React, {Component} from 'react';
import ResumeSection from '../components/resumeSection';

export default class Resume extends Component {

    render() {
        return (
            <div>
                <ResumeSection title="Technologies" type="skill" subtype="technology" renderer="inline"/>
                <ResumeSection title="Languages" type="skill" subtype="language" renderer="inline"/>
                <ResumeSection title="Work History" type="work" subtype="tech" renderer="block"/>
            </div>
        )
    }

}