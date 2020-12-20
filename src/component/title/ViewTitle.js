import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { useDispatch } from 'react-redux'
import { setTitle } from '../../redux/Action'

import { MyDate, MyTime } from '../../Custom/MyDate'
import { db } from '../../firebase'
import { Delete, Edit } from '@material-ui/icons'
function ViewTitle({ reload, TitleStats }) {

    const [data, setData] = useState([])
    useEffect(() => {
        db.collection("title").onSnapshot(async (snap) => {

            TitleStats(snap.docs)

            await setData(
                snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            )
        });

    }, [])

    const EditDoc =(id)=>{
        console.log(id)
    }

    const DeleteDoc =(id)=>{
        db.collection("title").doc(id).delete()
        .then(alert("Deleted successfully"))
        .catch(err=>{console.log("Error",err)})
    }




    const dispatch = useDispatch()
    return (
        <div className="w3-container">

            {
                data.map((data, index) => {
                    return (

                        <div className="card mb-3" id="troot" >

                            <div id="ttop">
                                <p className="pl-1 pt-1 pr-1 w3-right small w3-text-gray m-0">{MyTime(data.date)}</p>
                                <p className="pr-1 pt-1 pr-1 w3-right small w3-text-gray m-0">{MyDate(data.date)}</p>
                            </div>
                            <Link key={index} to="/reason" id="link" onClick={() => dispatch(setTitle(data.id))} >
                                <div id="middle">
                                    <p className="pl-3 w3-left m-0">{data.title}</p>
                                </div>
                            </Link>
                            <div id="tdown" className="w3-light-gray">
                                <div id="tmodify">

                                    <p className="pr-3 w3-text-gredineshmjs
                                    en" onClick={()=>EditDoc(data.id)}><Edit className="tmodifyicon" /></p>
                                    <p className="pr-3 pl-3 w3-text-red small" onClick={()=>DeleteDoc(data.id)}><Delete /></p>
                                </div>
                                <div>
                                    {data.debit > 0 && <p className="w3-text-red">-{data.debit}</p>}
                                    {data.credit > 0 && <p className="w3-text-green">+{data.credit}</p>}
                                </div>
                                <div>
                                    <p>Available : {data.available}</p>
                                </div>
                            </div>
                        </div>

                    )
                })
            }

        </div >
    )
}

export default ViewTitle

// const StatsMethod = (resdata) => {
    //     let debit = 0, credit = 0, available = 0, x,y,z=0
    //     for (x of resdata) {           
    //         debit += x.debit
    //         credit += x.credit
    //         available += x.available
    //     }
    //     const stats = {
    //         debit: debit,
    //         credit: credit,
    //         available: available
    //     }
    //     console.log(stats)
    //     TitleStats(stats)
    // }