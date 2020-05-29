import React, {Component} from 'react';
import Project from '../data/Project';

interface ProjectItemProps {
    project: Project
}

export default class ProjectItem extends Component<ProjectItemProps> {

    render() {
        return (
            <li className="project_item">
                <img src={this.props.project.project_image} alt={this.props.project.project_title}/>
                <div>
                    <div className="project_header">
                        <h2>{this.props.project.project_title} ({this.props.project.project_year}) </h2>
                        <p className="project_status">{this.props.project.project_status}</p>
                    </div>
                    <ul className="project_tags">
                        {this.props.project.project_tags.map((tag, index) => {
                            return (
                                <li>{tag}</li>
                            )
                        })}
                    </ul>
                    <div>
                        <p>{this.props.project.project_description}</p>
                        <a href={this.props.project.project_link} rel="noopener noreferrer" target="_blank">LINK</a>
                    </div>
                </div>
            </li>
        )
    }
}