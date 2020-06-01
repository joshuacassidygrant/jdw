import React, {Component} from 'react';

interface FilterBoxProps {
    tagList: Set<string>,
    changeFilter: Function,
    currentFilter: string
}

export default class FilterBox extends Component<FilterBoxProps> {
    
    render() {
        let cf = this.props.currentFilter;
        console.log(cf);
        return (
            <div>
                <ul className="filter_list">
                    Filter: 
                    {Array.from(this.props.tagList).map(tag => {
                        return (
                            <li className={cf === tag? "active": "inactive"} key={tag} onClick={e => this.props.changeFilter(tag)}>{tag}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }


}