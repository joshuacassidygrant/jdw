import React, {Component} from 'react';
import Project from '../data/Project';

interface ProjectItemProps {
    project: Project
}

export default class ProjectItem extends Component<ProjectItemProps> {

    render() {
        return (
            <li className="project_item">
                <img src={this.props.project.project_image}/>
                <div>
                    <h2>{this.props.project.project_title}</h2>
                    <p>{this.props.project.project_description}</p>
                </div>
            </li>
        )
    }
}