import React, {Component} from 'react';
import { API_URL } from '../config';
import Project from '../data/Project';
import ProjectItem from './projectItem';
import FilterBox from './filterBox';

interface ProjectListState {
    projects: Project[],
    currentFilter: string,
    tags: Set<string>
}

interface ProjectListProps {

}

export default class ProjectList extends Component<ProjectListProps, ProjectListState> {

    componentDidMount = () => {
        fetch(API_URL + 'projects/')
            .then(res => res.json())
            .then(projects => {
                this.setState({projects, currentFilter: "", tags: new Set(projects.flatMap((p: any) => p.project_tags))});

            });
    }

    changeFilter(currentFilter: string) {
        this.setState({currentFilter})
    }

    render() {
        if (this.state == null) {
            return ("...");
        }

        let projects = [];
        if (this.state.currentFilter === "") {
            projects = this.state.projects;
        } else {    
            projects = this.state.projects.filter(p => p.project_tags.includes(this.state.currentFilter));
        }
        projects.sort((x, y) => x.project_priority - y.project_priority);

        return (
            <div>
                Check out some other projects that I've executed/been involved with/contributed to:
                <FilterBox currentFilter={this.state.currentFilter} changeFilter={this.changeFilter.bind(this)} tagList={this.state.tags} />
                <ul className="project_list">
                    {projects.map((project, index) => {
                        return <ProjectItem key={index} project={project} />
                    })}
                </ul>
            </div>
               
        );
    }
}