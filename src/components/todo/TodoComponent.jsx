import { useNavigate, useParams } from "react-router-dom"
import { retrieveTodoApi, updateTodoApi,createTodoApi } from "../api/TodoApiService"
import { useAuth } from "../security/AuthContext"
import { useEffect, useState } from "react"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import './TodoApp.css';
import moment from "moment/moment"

export default function TodoComoponent(){

    const {id} = useParams()

    const [description, setDescription] =  useState('')
    const [targetDate, setTargetDate] =  useState('')
    const [isDone, setIsDone] =  useState(false)


    const navigate = useNavigate();

    const authContext =  useAuth()

    const username = authContext.username

    useEffect(
        () => retrieveTodos(),
        [id]
    )

    function retrieveTodos(){

        if(id != -1){
            retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
                setIsDone(response.data.done)
            })
            .catch(error => console.log(error))
        }
        
    }

    function onSubmit(values){
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: values.isDone
        }


        if(id == -1){
            createTodoApi(username, todo)
            .then(respone => navigate('/todos'))
            .catch(error => console.log(error))
        }else{
            updateTodoApi(username, id, todo)
            .then(response => navigate('/todos'))
            .catch(error => console.log(error))
        }
        
    }

    function validate(values){
        let errors = {}
        if(values.description.length <5){
            errors.description = "Enter at least 5 characters"
        }
        if(values.targetDate == null || values.targetDate =='' || !moment(values.targetDate).isValid()){
            errors.targetDate = "Enter a target date"
        }
        return errors
    }

    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description, targetDate, isDone}} 
                enableReinitialize = {true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}>
                   {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                id="errorMessageDescription"
                                name="description"
                                component="div"
                                className="alert alert-warning"/>
                            <ErrorMessage
                                id="errorMessageTargetDate"
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"/>

                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" id="descriptionField" className="form-control" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" id="dateField" className="form-control" name="targetDate"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>is Done</label>
                                <Field type="checkbox"  id="isDoneField" className="form-check-input mt-3" name="isDone"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" id="saveTodoButton" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                   }
                </Formik>
            </div>
        </div>
    )
}