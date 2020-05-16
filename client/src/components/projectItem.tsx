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
                    <div className="project_header">
                        <h2>{this.props.project.project_title} ({this.props.project.project_year}) </h2>
                        <p className="project_status">{this.props.project.project_status}</p>
                    </div>
                    <div>
                        <p>{this.props.project.project_description}</p>
                        <a href={this.props.project.project_link} target="_blank">LINK</a>
                    </div>
                </div>
            </li>
        )
    }
}