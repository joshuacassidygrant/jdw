import React, {Component} from 'react';
import ResumeRecordRenderer, { ResumeRecordProps } from './resumeRecordRenderer';

export default class ResumeRecordBlock extends ResumeRecordRenderer<ResumeRecordProps> {


    render() {
        return (
            <li className="record_block" key={this.props.index.toString()}>{this.props.record.record_title}</li>
        )
    }

}