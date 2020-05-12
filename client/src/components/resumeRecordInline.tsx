import React, {Component} from 'react';
import ResumeRecordRenderer, { ResumeRecordProps } from './resumeRecordRenderer';

export default class ResumeRecordInline extends ResumeRecordRenderer<ResumeRecordProps> {


    render() {
        return (
            <li className={"record_inline relevance_" + this.props.record.record_relevance} key={this.props.index.toString()}>{this.props.record.record_title}</li>
        )
    }

}