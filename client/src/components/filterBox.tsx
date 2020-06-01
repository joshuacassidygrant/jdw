import React, {Component} from 'react';

interface FilterBoxProps {
    tagList: Set<string>,
    changeFilter: Function,
    currentFilter: string
}

export default class FilterBox extends Component<FilterBoxProps> {
    
    render() {
        let cf = this.props.currentFilter;
        return (
            <div className="filter_box">
                <ul className="filter_list">
                FILTER: <li className={cf === ""? "active" : "inactive"} key="All" onClick={e => this.props.changeFilter("")}>Show All</li>
                    {Array.from(this.props.tagList).map(tag => {
                        return (
                            <li className={cf === tag? "active":"inactive" } key={tag} onClick={e => this.props.changeFilter(tag)}>{tag}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }


}