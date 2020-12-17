import React, { useState } from 'react'


function Filter({ FilterData, data }) {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const year = ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]

    const [selectYear,setselectYear] = useState("")
    const [selectMonth,setselectMonth] = useState("") 
     
    const filter = (e) => { 
        e.preventDefault()     

        if(selectMonth !=="" && selectYear !==""){
            FilterData(data.filter(checkdata))
        }

    }

    const checkdata =(data)=>{
        const date = new Date(data.invoicedate)
        const month = date.getMonth() +1
        const year = date.getFullYear()

        const date2 = new Date(`01-${selectMonth}-${selectYear}`)
        const month2 = date2.getMonth() + 1 
        const year2 = date2.getFullYear()


        
        if(month === month2 && year === year2){
            return data
        }
    }
    const style={
        display: "flex",
        flexDirection: "row"    
    }
    return (
        <div className="w3-container">
            <form className="form" style={style} onSubmit={filter}>
                <select name="month" className="form-control m-2" onChange={(e)=>setselectMonth(e.target.value)} value={selectMonth}>
                    <option value="">Select Month</option>
                    {
                        month.map((month,index) => (
                            <option key={index} value={month}>{month}</option>
                        ))
                    }
                </select>

                <select name="year" className="form-control m-2" onChange={(e)=>setselectYear(e.target.value)} value={selectYear}>
                    <option value="">Select Year</option>
                    {
                        year.map((year,index) => (
                            <option key={index} value={year}>{year}</option>
                        ))
                    }
                </select>

                <button className="btn btn-success m-2">Filter</button>

            </form>
            
        </div>
    )
}

export default Filter