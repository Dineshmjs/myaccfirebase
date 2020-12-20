import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import {db} from '../../firebase'


function TitleForm({Reload}) {

    const initialValues = {
        title:"",
        type:""
    }
    const submit=(values,props)=>{
        console.log("submit")
        const {title,type} = values
        const data = {            
            title,
            type,
            debit:0,
            credit:0,
            available:0,
            date:Date.now()
        }
        console.log("data",data)

        db.collection("title").add(data)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });        
    }
    const validationSchema = yup.object({
        title:yup.string().required("Enter Title"),
        type:yup.string().required("Choose Type")
    })
    return (
        <div className="w3-container">
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
                validationSchema={validationSchema}
            >
                <Form>
                    <div className="w3-container ">
                        <p className="w3-center pt-3">Create New Title</p>
                    </div>
                    <div className="m-2">
                        <Field name="title" type="text" className="form-control" placeholder="Enter Title" />
                        <ErrorMessage name="title" />
                    </div>
                    <div className="m-2">
                        <Field as="select" name="type" type="text" className="form-control">
                            <option value="">Select Categry</option>
                            <option value="debit">Only Credit</option>
                            <option value="credit">Credit and Debit</option>
                        </Field>
                        <ErrorMessage name="type" />
                    </div>
                    <div className="w3-center m-2">
                        <button type="submit" className="btn btn-success mb-3" >Submit</button>
                    </div>    
                    
                </Form>
            </Formik>

        </div>
    )
}

export default TitleForm
