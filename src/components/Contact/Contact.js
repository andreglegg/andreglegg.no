import React, {Component} from 'react';
import classes from './Contact.css'

import Input from '../Ui/Input/Input'
import Spinner from '../Ui/Spinner/Spinner'
import * as emailjs from 'emailjs-com';


class Contact extends Component {
    state = {
        contactForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: false,
                touched: false
            },
            message: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'A message to me!'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        sendingMail: false,
        showThanks: false,
    };
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedcontactForm = {
            ...this.state.contactForm
        };
        const updatedFormElement = {...updatedcontactForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedcontactForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedcontactForm) {
            formIsValid = updatedcontactForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({contactForm: updatedcontactForm, formIsValid: formIsValid});
    };
    send = (templateParams) => {
        this.setState({
            sendingMail: true
        });

        const mailSend = () => {
            this.setState({
                sendingMail: false,
                showThanks: true,
            });
        };

        emailjs.send('default_service', 'template_bAtNLp8Y', templateParams)
            .then(function (response) {

                console.log('SUCCESS!', response.status, response.text);
                mailSend()

            }, function (error) {
                console.log('FAILED...', error);
                mailSend()

            });

    };

    componentDidMount() {
        emailjs.init("user_U6Xq26b9PeSeGVTksFMyK");
        console.log("Contact Mounted")
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.contactForm) {
            formElementArray.push({
                id: key,
                config: this.state.contactForm[key]
            })
        }
        let form = <Spinner/>;

        if (!this.state.sendingMail) {

            if (this.state.showThanks) {
                form = "Thanks for the message!"
            }

            else {

                form = (
                    <div>
                        {formElementArray.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                        ))}
                        <button className={classes.SendButton} disabled={!this.state.formIsValid}
                                onClick={() => this.send({
                                    from_name: this.state.contactForm.name.value,
                                    message: this.state.contactForm.message.value,
                                    reply_to: this.state.contactForm.email.value,
                                    phone: this.state.contactForm.phone.value
                                })}>Send
                        </button>
                    </div>
                );
            }
        }

        return (
            <div className={classes.Contact} name="contact">
                <div className={classes.Container}>
                    <h2>I'd love to chat, send me an email!</h2>
                    <div className={classes.ContactForm}>
                        {form}
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
