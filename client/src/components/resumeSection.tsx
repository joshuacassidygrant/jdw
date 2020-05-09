import React, {Component} from 'react';
import {API_URL} from '../config';

interface ResumeSectionState {
    records: ResumeRecord[]
}

interface ResumeSectionProps {
    title: String,
    type: String,
    subtype: String
}

interface ResumeRecord {
    record_type: String,
    record_subtype: String,
    record_title: String,
    record_date: String,
    record_text: String,
    record_priority: Number
}

export default class ResumeSection extends Component<ResumeSectionProps, ResumeSectionState> {

    componentDidMount() {
        fetch(API_URL + 'resume')
            .then(res => res.json())
            .then(records => this.setState({records}));
            // TODO: only get records that are relevant to type/subtype
    }

    render() {
        if (this.state === null || this.state.records === null) {
            return "Loading";
        } else {
            return (
                <div className="section">
                    <h3>{this.props.title}</h3>
                    <ul>
                        {this.state.records.map((value, i) => {
                            return <li key={i}>{value.record_title}</li>
                        })}
                    </ul>
                </div>
            )
        }
    }
}