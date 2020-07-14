import React from 'react';
import './App.css';
import styled from '@emotion/styled'
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

const Main = styled.main`
  width: 50vw;
  margin: 10vh auto;
  padding: 20px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
`;

function Label(props) {
    return <label style={{display: "block"}} {...props} />;
}

function FullInput({name, label, placeholder, type}) {
    return (
        <div>
            <Label>{label}</Label>
            <Field name={name} placeholder={placeholder ? placeholder : null} type={type ? type : 'text'}/>
            <div>
                <ErrorMessage name={name}/>
            </div>
        </div>
    );
}

function SelectInput({name, label, options, multiple = false}) {

    return (
        <div>
            <Label>{label}</Label>
            <Field name={name} component="select" multiple={multiple}>
                {options.map((element, index) => (
                    <option value={element.value} key={index}>{element.option_name}</option>
                ))}
            </Field>
            <div>
                <ErrorMessage name="practicing_status"/>
            </div>
        </div>
    );
}

function App() {
    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        zip_code: "",
        password: "",
        practicing_status: 0,
        legal_expertise: 7,
        years_of_experience: 0,
        languages: [],
        phone_number: '',
        terms_of_use: false
    }
    const validationSchema = Yup.object({
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        email: Yup.string().email().required(),
        zip_code: Yup.string().min(6).max(6).required(),
        password: Yup.string().required(),
        years_of_experience: Yup.number().min(0).max(60).required(),
        phone_number: Yup.string().min(9).max(9),
        ethnicity: Yup.string().required(),
        terms_of_use: Yup.bool().oneOf([true], "Conditions must be accepted").required()
    })
    const onSubmit = (values, actions) => {
        console.log({values, actions});
    }
    const practicing_statusOptions = [
        {option_name: 'Practicing Lawyer', value: 0},
        {option_name: 'Non Practicing Lawyer', value: 1},
        {option_name: 'Retired Lawyer', value: 2}
    ]
    const legal_expertiseOptions = [
        {option_name: 'Antitrust', value: 1},
        {option_name: 'Civil Rights', value: 2},
        {option_name: 'Immigration', value: 3},
        {option_name: 'Memes', value: 4},
        {option_name: 'Gaming', value: 5},
        {option_name: 'Pretending to work', value: 6},
        {option_name: 'Other', value: 7}
    ]
    const languagesOptions = [
        {option_name: 'Spanish', value: 'es'},
        {option_name: 'English', value: 'en'},
        {option_name: 'Dothraki', value: 'do'},
        {option_name: 'Kryptonese', value: 'ky'},
        {option_name: 'Klingon', value: 'kl'},
        {option_name: 'Vulcan', value: 'vu'},
        {option_name: 'Alienese', value: 'ali'},
        {option_name: 'Elvish', value: 'el'},
    ]
    return (
        <Main>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <FullInput name="firstName" label="First Name"/>
                    <FullInput name="last_name" label="Last Name"/>
                    <FullInput name="email" label="Email"/>
                    <FullInput name="zip_code" label="Zip Code" placeholder={123456}/>
                    <FullInput name="password" label="Password" type={"password"}/>
                    <SelectInput name="practicing_status" label="Practicing Status"
                                 options={practicing_statusOptions}/>
                    <SelectInput name="legal_expertise" label="Area of legal expertise"
                                 options={legal_expertiseOptions}/>
                    <FullInput name="years_of_experience" label="Years of experience" type={"number"}/>
                    <SelectInput name="languages" label="Languages" multiple={true}
                                 options={languagesOptions}/>
                    <FullInput name="phone_number" label="Cell Phone Number" placeholder="#######"/>
                    <div role="group">
                        <label>
                            <Field type="radio" name="ethnicity" value="Earthling"/>
                            Earthling
                        </label>
                        <label>
                            <Field type="radio" name="ethnicity" value="Martian"/>
                            Martian
                        </label>
                        <label>
                            <Field type="radio" name="ethnicity" value="Asgardian"/>
                            Asgardian
                        </label>
                    </div>
                    <div>
                        <label>
                            <Field type="checkbox" name="terms_of_use"/>
                            I swear that I totally read the terms of use
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </Main>
    );
}

export default App;
