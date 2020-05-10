import React, {Component} from 'react';
import ResumeRecordRenderer, { ResumeRecordProps } from './resumeRecordRenderer';

export default class ResumeRecordInline extends ResumeRecordRenderer<ResumeRecordProps> {


    render() {
        return (
            <li className="record_inline" key={this.props.index.toString()}>{this.props.record.record_title}</li>
        )
    }

}