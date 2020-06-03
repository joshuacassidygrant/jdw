import React, {Component} from 'react';
import { API_URL } from '../config';


interface ContactFormState {
    name: string,
    email: string,
    message: string,
    status: string
}

interface ContactFormProps {

}

export default class ContactForm extends Component<ContactFormProps, ContactFormState> {
    
    constructor(cf: {}) {
        super(cf);
        this.state = {
            name: "",
            email: "",
            message: "",
            status: ""

        };
    }

    render = () => {
        if (this.state.status !== "") {
            return (
                <div className="form_holder">
                    <p className="status loading">{this.state.status}</p>
                </div>
            )
        }

        return (
            <div className="form_holder">
                <form className="contact_form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form_group">
                        <label htmlFor="name">Name</label>
                        <input name="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} type="text" id="name" />
                    </div>
                    <div className="form_group">
                        <label htmlFor="email">Email address</label>
                        <input name="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} type="email" id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="form_group">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" value={this.state.message} onChange={this.handleMessageChange.bind(this)} id="message"></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )

    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        this.setState({status: "Sending..."});

        fetch(API_URL + "send", {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,   
                email: this.state.email,  
                messsage: this.state.message
            })
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error(res.statusText);
            }

            this.setState(
               {status: "Thank you! I'll respond to you when I can."}
            )
            this.resetForm();
        }).catch((err) => {
            this.setState(
                {status: "Uh oh. Something went wrong with the form. Please contact me directly at hello at joshua dot works."}
             )
             this.resetForm();

        })

    }

    handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({name: (e.target as HTMLInputElement).value})
    }

    handleEmailChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({email: (e.target as HTMLInputElement).value})
    }

    handleMessageChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        this.setState({message: (e.target as HTMLTextAreaElement).value})
    }

    
    resetForm(){
        this.setState({
            name: "",
            email: "",
            message: ""
        });
    }
}