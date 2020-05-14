export default interface Project {
    project_type: ProjectType,
    project_title: String,
    project_priority: Number,
    project_year: Number,
    project_month: Number,
    project_description: String,
    project_link: String,
    project_image: String,
    project_status: String,
    project_tags: String[]
}

export enum ProjectType {
    GAMEDEV = "Game Development",
    WEBDEV = "Web Development"
}