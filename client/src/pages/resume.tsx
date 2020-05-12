import React, {Component} from 'react';
import ResumeSection from '../components/resumeSection';

export default class Resume extends Component {

    render() {
        return (
            <div>
                <h2>Education</h2>
                <ResumeSection title="" type="education" subtype="" renderer="block"/>
                <h2>Skills</h2> 
                <ResumeSection title="Technologies" type="skill" subtype="technology" renderer="inline"/>
                <ResumeSection title="Languages" type="skill" subtype="language" renderer="inline"/>
                <h2>Work History</h2>
                <ResumeSection title="" type="work" subtype="tech" renderer="block"/>
            </div>
        )
    }

}