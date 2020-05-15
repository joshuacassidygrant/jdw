export default interface Project {
    project_type: ProjectType,
    project_title: string,
    project_priority: number,
    project_year: number,
    project_month: number,
    project_description: string,
    project_link: string,
    project_image: string,
    project_status: string,
    project_tags: string[]
}

export enum ProjectType {
    GAMEDEV = "Game Development",
    WEBDEV = "Web Development"
}