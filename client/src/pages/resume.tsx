import React, {Component} from 'react';
import ResumeSection from '../components/resumeSection';
import { Link } from 'react-router-dom';


export default class Resume extends Component {

    render() {
        return (
            <div className="resume">
                <a href="files/RESUME_GrantJoshua_2020.pdf" rel="noopener noreferrer" target="_blank" download> Download PDF </a>
                <h2>Education</h2>
                <ResumeSection title="" type="education" subtype="" renderer="block"/>
                <h2>Skills</h2> 
                <ResumeSection title="Languages" type="skill" subtype="language" renderer="inline"/>
                <ResumeSection title="Technologies" type="skill" subtype="technology" renderer="inline"/>
                <ResumeSection title="General" type="skill" subtype="general" renderer="inline"/>

                <h2>Relevant Work History</h2>
                <ResumeSection title="" type="work" subtype="tech" renderer="block"/>

                <h2>Projects</h2>
                <Link to="/projects">Click here to see a complete list!</Link>

                <h2>Hire me</h2>
                <p>Want to get in touch? <Link to="/contact">Contact me here.</Link></p>
            </div>
        )
    }

}