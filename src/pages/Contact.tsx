//@ts-nocheck

import React, { useState } from "react";
import styled from "styled-components";
import { sendContactForm } from "../apiClient";
import HeaderBar from "../components/HeaderBar";
import { ContactForm } from "../types";
import validator from "validator";
import { Formik, Form, Field, ErrorMessage, getIn } from "formik";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  const [message, setMessage] = useState("");

  const submitForm = async (event: any) => {
    event.preventDefault();
    const form: ContactForm = {
      firstName,
      lastName,
      subject,
      email,
      message,
    };

    try {
      await sendContactForm(form);
    } catch (e) {
      console.log(e);
    }
  };

  const validate = {
    firstName: (name: string) => name.length > 2,
    lastName: (name: string) => name.length > 2,
    email: (email: string) => validator.isEmail(email),
    subject: (subject: string) => subject.length > 2,
    message: (msg: string) => msg.length > 10,
  };

  return (
    <Container>
      <HeaderBar activePath="contact" />
      <Title>Contact Me!</Title>
      <FormContainer>
        <Formik
          validateOnChange={false}
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            subject: "",
            message: "",
          }}
          validate={(values) => {
            const errors: {
              firstName?: string;
              lastName?: string;
              email?: string;
              subject?: string;
              message?: string;
            } = {};

            Object.keys(values).forEach((key: string) => {
              if (
                !validate[key as keyof typeof values](
                  values[key as keyof typeof values]
                )
              ) {
                errors[key as keyof typeof values] = "Invalid Input";
              }
            });

            console.log(errors);
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormTable>
                <tr>
                  <td>
                    <Label>Name*</Label>
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label>Email/Subject*</Label>
                  </td>
                  <td>
                    <Input
                      type="text"
                      name="email"
                      placeholder="Email Address"
                    />
                  </td>
                  <td>
                    <Input type="text" name="subject" placeholder="Subject" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Label>Message*</Label>
                  </td>
                  <td colSpan={2}>
                    <Input
                      rows={5}
                      component="textarea"
                      type="text"
                      name="message"
                      placeholder="Message"
                    />
                  </td>
                </tr>
              </FormTable>
              <Submit type="submit" disabled={isSubmitting}></Submit>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const Title = styled.p`
  font-size: 3em;
  font-family: "Barlow Semi Condensed";
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  margin-top: 4rem;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
`;

const FormContainer = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 3rem;
  text-align: center;
`;

const FormTable = styled.table`
  text-align: left;
  border-spacing: 2em;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.5em;
  font-family: "Barlow Semi Condensed";
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`;

const Input = styled(Field)`
  font-size: 1em;
  padding: 0.6em;
  border-radius: 10px;
  font-family: "Barlow Semi Condensed";
  color: black;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.text};
  margin-right: 2em;
  width: 100%;
  resize: vertical;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.text};
  }
`;

const ErrorInput = styled.input`
  font-size: 1em;
  padding: 0.6em;
  border-radius: 10px;
  font-family: "Barlow Semi Condensed";
  color: ${({ theme }) => theme.colors.text};
  border-width: 1.5px;
  border-color: red;
  margin-right: 2em;
  width: 100%;
  resize: vertical;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.text};
  }
`;

const Submit = styled.input`
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.text};
  border: none;
  width: 20%;
  padding: 0.8em;
  cursor: pointer;
  border-radius: 0.5em;
  margin-top: 1.2em;
  font-size: 1.5em;
  font-family: "Barlow Semi Condensed";
  font-weight: bold;
  margin: auto;
`;
