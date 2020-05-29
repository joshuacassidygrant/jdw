import React, {Component} from 'react';
import ContactForm from '../components/contactForm';

export default class Contact extends Component {


    render() {
        return (
            <div>
                <h2>Contact me...</h2>
                <p>I'm on <a target="_blank" href="https://github.com/joshuacassidygrant/">GitHub</a> and <a target="_blank" href="https://www.linkedin.com/in/joshuacgrant/">LinkedIn</a></p>
                <p>Or use the form below:</p>
                <ContactForm/>
            </div>
        )
    }
}