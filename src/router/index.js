import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Main from '../component/'
import Reason from '../component/reason'

function index() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component = {Main} />
                <Route exact path="/reason" component = {Reason} />
            </Switch>
        </BrowserRouter>
    )
}

export default index
