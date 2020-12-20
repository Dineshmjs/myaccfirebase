
import React,{useState,useEffect} from 'react'
import {db} from '../firebase'

function Test() {
    const [uname,setName] = useState("")
    const [pass,setPass] = useState("")
    const [data,setData] = useState([])

    useEffect(() => {
        db.collection("profile").onSnapshot(snap=>{
            setData( snap.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            })))
        })
    }, [])

    const Submit =(e)=>{
        e.preventDefault()
        db.collection("profile").add({
            uname:uname,
            pass:pass
        })
        
    }

    const Delete =(id)=>{
        db.collection('profile').doc(id).delete()
    }

    const Edit =(id)=>{
        db.collection('profile').doc(id).update({
            uname:"aaa",
            pass:"000",
            ref:"update"
        })
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <input type="text" name="uname" onChange={(e)=>setName(e.target.value)} value={uname} />
                <input type="text" name="pass" onChange={(e)=>setPass(e.target.value)} value={pass} />
                <button type="submit">Submit</button>
            </form>
            <div className="w3-gray w3-container m-3">
                {
                    data.map(data=>{
                        console.log(data)
                        return(
                            <div key={data.id}>
                                <p>{data.uname}</p>
                                <p>{data.pass}</p>
                                <button onClick={()=>Edit(data.id)}>Edit</button>
                                <button onClick={()=>Delete(data.id)}>Delete</button>
                            </div>    
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Test
