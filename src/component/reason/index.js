import React,{useState} from 'react'
import ViewReason from './ViewReason'
import Head from '../Head'
import Stats from '../Stats'
import New from '../New'

function Reason() {
    const [stats,setStats] = useState([])
    return (
        <div>
            <Head />
            <Stats stats={stats} />
            <New target="#reasonform" />
            <ViewReason />
        </div>
    )
}

export default Reason
