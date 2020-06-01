import React, {Component} from 'react';
import {API_URL} from '../config';
import ResumeRecord from '../data/ResumeRecord';
import ResumeRecordInline from './resumeRecordInline';
import ResumeRecordBlock from './resumeRecordBlock';

interface ResumeSectionState {
    records: ResumeRecord[]
}

interface ResumeSectionProps {
    title: String,
    type: String,
    subtype: String,
    renderer: String
}



export default class ResumeSection extends Component<ResumeSectionProps, ResumeSectionState> {

    componentDidMount = () => {
        fetch(API_URL + 'resume/' + this.props.type + '/'  + this.props.subtype)
            .then(res => res.json())
            .then(res => {
                let records:ResumeRecord[] = res
                .sort((x: ResumeRecord, y: ResumeRecord) => x.record_relevance as number - (y.record_relevance as number))
                .sort((x: ResumeRecord, y: ResumeRecord) => x.record_priority as number - (y.record_priority as number))
                this.setState({records})
            });
    }

    render() {
        if (this.state === null || this.state.records === null) {
            return "...";
        } else {
            return (
                <div className="section resume_section">
                    <h3>{this.props.title}</h3>
                    <ul>
                        {this.state.records.map((value, i) => {
                            switch(this.props.renderer) {
                                case "inline":
                                    return (<ResumeRecordInline key={i} index={i} record={value}/>)
                                case "block":
                                    return (<ResumeRecordBlock key={i} index={i} record={value}/>)
                            }
                            return "";
                        })}
                    </ul>
                </div>
            )
        }
    }
}