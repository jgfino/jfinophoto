import { useState } from "react";
import styled from "styled-components";
import { sendContactForm } from "../apiClient";
import HeaderBar from "../components/HeaderBar";
import validator from "validator";
import { Formik, Form } from "formik";
import SimplePopup from "../components/SimplePopup";
import FooterBar from "../components/FooterBar";
import OutlineErrorInput from "../components/OutlineErrorInput";

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  const validate = {
    firstName: (name: string) => name.length > 2,
    lastName: (name: string) => name.length > 1,
    email: (email: string) => validator.isEmail(email),
    subject: (subject: string) => subject.length > 2,
    message: (msg: string) => msg.length > 10,
  };

  return (
    <Container>
      <SimplePopup
        open={showPopup}
        message={popupText}
        onClose={() => setShowPopup(false)}
      />
      <HeaderBar activePath="contact" />
      <InnerContainer>
        <FormContainer>
          <Title>CONTACT ME!</Title>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
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
                    values[key as keyof typeof values].trim()
                  )
                ) {
                  errors[key as keyof typeof values] = "Invalid Input";
                }
              });
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                await sendContactForm(values);
                setPopupText(
                  "Thank you for your inquiry! I will get back to you shortly."
                );
                resetForm();
              } catch (e) {
                setPopupText(
                  "There was an error processing your inquiry. Please try again. If the problem persists, please email me directly."
                );
                console.log(e);
              } finally {
                setSubmitting(false);
                setShowPopup(true);
              }
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <FormTable>
                  <tr>
                    <td>
                      <Label>Name*</Label>
                    </td>
                    <td>
                      <OutlineErrorInput
                        showOutline={errors.firstName}
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        errorMessage="Minimum 2 characters"
                      />
                    </td>
                    <td>
                      <OutlineErrorInput
                        showOutline={errors.lastName}
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
                      <OutlineErrorInput
                        showOutline={errors.email}
                        type="text"
                        name="email"
                        placeholder="Email Address"
                      />
                    </td>
                    <td>
                      <OutlineErrorInput
                        showOutline={errors.subject}
                        type="text"
                        name="subject"
                        placeholder="Subject"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label>Message*</Label>
                    </td>
                    <td colSpan={2}>
                      <OutlineErrorInput
                        showOutline={errors.message}
                        rows={5}
                        component="textarea"
                        type="text"
                        name="message"
                        placeholder="Message"
                      />
                    </td>
                  </tr>
                </FormTable>
                {errors.firstName && (
                  <ErrorText>
                    One or more fields contain invalid input
                  </ErrorText>
                )}
                <Submit type="submit" disabled={isSubmitting}></Submit>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </InnerContainer>
      <FooterBar />
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  flex: 1;
`;

const Title = styled.p`
  font-size: 3em;
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  margin-bottom: 3rem;
  font-weight: 400;
  text-decoration: none;
  text-align: center;
`;

const FormContainer = styled.div`
  margin-top: 4rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const FormTable = styled.table`
  text-align: left;
  border-spacing: 2em;
`;

const Label = styled.label`
  font-size: 1.3em;
  font-family: ${({ theme }) => theme.fontFamily.text};
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
`;

const ErrorText = styled.p`
  font-size: 1em;
  font-style: italic;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily.text};
  margin: 0.2em;
  margin-bottom: 2em;
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
  font-family: ${({ theme }) => theme.fontFamily.main};
  font-weight: bold;
  margin: auto;
  margin-bottom: 2em;
`;
