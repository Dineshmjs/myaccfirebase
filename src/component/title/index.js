import React,{useState} from 'react'
import Head from '../Head'
import New from '../New'
import Stats from '../Stats'
import ViewTitle from './ViewTitle'


function Title() {

    const [stats,setStats] = useState([])
    
    const TitleStats=(data)=>{
        setStats(data)
    }
    return (
        <div>
            <Head />
            <Stats stats={stats} />
            <New target="#titleform" />
            <ViewTitle TitleStats={TitleStats} />
        </div>
    )
}

export default Title
