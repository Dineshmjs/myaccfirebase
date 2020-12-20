import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { db } from '../../firebase'
import { useSelector } from 'react-redux'


function ReasonForm() {

    const title = useSelector(state => state.title)
    const [available, setAvailable] = useState(0)
    const [credit, setCredit] = useState(0)
    const [debit, setDebit] = useState(0)

    const initialValues = {
        reason: "",
        amount: "",
        action: ""
    }

    const submit = async(values, props) => {
        const { reason, amount, action } = values

        await db.collection("title").doc(title).onSnapshot(doc => {
            const {debit:d,credit:c,available:a} = doc.data()
            console.log("prevTitle",doc.data())
            setAvailable(a)
            setDebit(d)
            setCredit(c)
        })

        let reasondebit, reasoncredit, reasonavailable

        if (action === "debit") {
            reasondebit = amount
            reasonavailable = available - amount
            reasoncredit = 0
        }
        if (action === "credit") {
            reasondebit = 0
            reasonavailable = available + amount
            reasoncredit = amount
        }
        
        const data = {
            reason,
            title,
            action,
            debit: reasondebit,
            credit: reasoncredit,
            available: reasonavailable,
            date: Date.now()
        }

        console.log("currenReason",data)

        // 
        await db.collection("reason").add(data)
            .then(
                async() => {

                    await db.collection("title").doc(title).onSnapshot(doc => {
                        const {debit:d,credit:c,available:a} = doc.data()
                        console.log("prevTitle",doc.data())
                        setAvailable(a)
                        setDebit(d)
                        setCredit(c)
                    })


                    let titlecredit,titledebit
                    if (action === "debit") {
                        titledebit = debit + amount
                        titlecredit = credit
                    }
                    if (action === "credit") {
                        titlecredit = credit + amount
                        titledebit = debit
                    }

                    console.log("currentTitle",titlecredit,titledebit,reasonavailable)

                    db.collection("title").doc(title).update({
                        debit: titledebit,
                        credit: titlecredit,
                        available: reasonavailable
                    })

                })



            .catch(err => { console.log(err) })


        props.resetForm()
    }

    const validationSchema = yup.object({
        reason: yup.string().required("Enter Reason"),
        amount: yup.number().required("Enter Number"),
        action: yup.string().required("Choose Method")
    })

    return (
        <div className="w3-container">
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
                validationSchema={validationSchema}
            >
                <div>
                    <Form>
                        <div>
                            <p className="w3-center pt-3">Reason Entry</p>
                        </div>
                        <div>
                            <Field name="reason" type="text" className="form-control mt-2" placeholder="Enter Reason" />
                            <ErrorMessage name="reason" />
                        </div>
                        <div>
                            <Field name="amount" type="number" className="form-control mt-2" placeholder="Enter Amount" />
                            <ErrorMessage name="amount" />
                        </div>

                        <div>
                            <Field name="action" as="select" className="form-control mt-2" >
                                <option value="">Select Method</option>
                                <option value="debit">Debit</option>
                                <option value="credit">Credit</option>
                            </Field>
                            <ErrorMessage name="action" />
                        </div>
                        <div className="w3-center">
                            <button type="submit" className="btn btn-success mt-2 mb-3">Submit</button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}

export default ReasonForm
