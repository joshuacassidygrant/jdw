import React, {Component} from 'react';
import { API_URL } from '../config';
import Project from '../data/Project';
import ProjectItem from './projectItem';

interface ProjectListState {
    projects: Project[]
}

interface ProjectListProps {

}

export default class ProjectList extends Component<ProjectListProps, ProjectListState> {

    componentDidMount = () => {
        fetch(API_URL + 'projects/')
            .then(res => res.json())
            .then(projects => {
                this.setState({projects});
            });
    }

    render() {
        if (this.state == null) {
            return ("...");
        }
        return (
            <ul>
                 {this.state.projects.map((project, index) => {
                    return <ProjectItem project={project} />
                 })}
            </ul>
               
        );
    }
}