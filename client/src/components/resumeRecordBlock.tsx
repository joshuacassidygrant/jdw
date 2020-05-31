import React from 'react';
import ResumeRecordRenderer, { ResumeRecordProps } from './resumeRecordRenderer';

export default class ResumeRecordBlock extends ResumeRecordRenderer<ResumeRecordProps> {


    render() {
        return (
            <li className="record_block" key={this.props.index.toString()}>
                <div className="head">
                    <div className="left">{this.props.record.record_title}</div>
                    <div className="right">{this.props.record.record_date}</div>
                </div>
                <p className="record_subtext">{this.props.record.record_text}</p>
                <ul className="record_subitems">
                    {this.props.record.record_subitems.map((value, i) => {
                        return <li key={i}>{value}</li>
                    })}
                </ul>
            </li>
        )
    }

}