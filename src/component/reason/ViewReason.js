import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../firebase'
import { MyDate, MyTime } from '../../Custom/MyDate'
import { Delete, Edit } from '@material-ui/icons'

function ViewReason() {
    const [data, setData] = useState([])
    const [titleInfo, setTitleInfo] = useState({})
    const title = useSelector(state => state.title)
    useEffect(() => {
        if (title) {
            db.collection('title').doc(`${title}`).onSnapshot((doc) => {
                setTitleInfo(doc.data())
            })

            // db.collection("reason").where("title","==",title)
            // .get()
            // .then(
            //     (res)=>{
            //         setData(
            //             res.forEach(doc=>({
            //                  id:doc.id,
            //                  ...doc.data() 
            //             }))
            //         )
                    
            //         // setData(
            //         //     res.map(doc=>({id:doc.id,...doc.data()}))
            //         // )
            //     }
            // )
            // .catch(err=>{
            //     console.log(err)
            // })

            db.collection('reason').orderBy("date").onSnapshot((snap) => {
                


                let resdata = [], x
                for (x of snap.docs) {
                    if (x.data().title === title) {
                        resdata.push({id:x.id,...x.data()})
                    }
                }
                setData(resdata)

            })
        }
    }, [])

    const EditReason = (id) => {
        db.collection("reason").doc(id).update()
    }

    const DeleteReason = (id) => {
        db.collection("reason").doc(id).delete()
    }

    return (
        <div className="w3-container">
            {console.log("data", data)}
            {  titleInfo && <p className="w3-center w3-text-pink"><b>{titleInfo.title}</b></p>}
            {
                data.map((data, index) => {
                    return (

                        <div className="card mb-3" id="troot" >

                            <div id="ttop">
                                <p className="pl-1 pt-1 pr-1 w3-right small w3-text-gray m-0">{MyTime(data.date)}</p>
                                <p className="pr-1 pt-1 pr-1 w3-right small w3-text-gray m-0">{MyDate(data.date)}</p>
                            </div>

                            <div id="middle">
                                <p className="pl-3 w3-left m-0">{data.reason}</p>
                            </div>

                            <div id="tdown" className="w3-light-gray">
                                <div id="tmodify">

                                    <p className="pr-3 w3-text-gredineshmjs
                                    en" onClick={() => EditReason(data.id)}><Edit className="tmodifyicon" /></p>
                                    <p className="pr-3 pl-3 w3-text-red small" onClick={() => DeleteReason(data.id)}><Delete /></p>
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
        </div>

    )
}

export default ViewReason
