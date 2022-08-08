import React, { useState, useEffect } from "react";

function getData() {

    let url = "http://localhost:3001/data";

    fetch(url)
        .then((response) => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        });
}

function SortingButton(props){

    const [isASC,setASC] = useState(true);
    const [val,setVal] = useState("up");
    
    function handleSort(){
        
        console.log(val,isASC);
        if(isASC){

            // setListData([...listData].sort(sortByASC(props.name)));
            
            setVal("down")
        }
        else{

            // setListData([...listData].sort(sortByDSC(props.name)));
            setVal("up")
        }

        setASC(!isASC)
    }

    return(
        <button onClick = {handleSort} sorting={val}>{val}</button>
    )
}


function sortByASC(field) {

    return function (a, b) {
        return (a[field] > b[field]) - (a[field] < b[field])
    };
}

function sortByDSC(field){

    return function (a, b) {
        return -(a[field] > b[field]) - (a[field] < b[field])
    };
}


export default function Dashboard() {

    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState([]);
    const [index, setIndex] = useState([]);
    const [listData, setListData] = useState([]);
    const [order,setOrder] = useState([true,true])

    useEffect(() => {

        let url = "http://localhost:3001/data";

        fetch(url)
            .then((response) => response.json())
            .then(data => {

                setData(data.data);
                setListData(data.data);

            })
            .catch(err => {
                console.log(err);
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });


    }, [])

    function handleSort(name,field,e){

        let ind = parseInt(name)
        //console.log(ind);
        if(order[ind]) setListData([...listData].sort(sortByASC(field)));
        else setListData([...listData].sort(sortByDSC(field)));

        if(ind === 0){

            setOrder([!order[0],order[1]]);
        }
        else{

            setOrder([order[0],!order[1]]);
        }



    }

    function handleInput(e){

        let str = e.target.value;
        let n = str.length;
        let temp = data.filter((doc)=>{

            return (doc.title.slice(0,n).toLowerCase() == str.toLowerCase());
        })

        setListData(temp);
    }




    function renderDashboard() {

        if (isLoading) {
            return (<div>Loading data please wait</div>)
        }

        if (isError) {
            return (<div>Some error occured , refresh </div>)
        }

        const table_data = listData.map((doc, ind) => {
            
            return (

                <tr>
                    <th scope="row">{doc.id}</th>
                    <td>{doc.title}</td>
                    <td>{doc.date} </td>
                    <td>link</td>
                </tr>


            )
        });

        return (
            <div className="vh-100 vw-100">
                <p> Testing dashboard functionality</p>
                <input className = "m-5" onChange={handleInput}></input>
                <p>Total Results : {listData.length}</p>
                <div className="overflow-scroll">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" name = "title">Title <button onClick ={(e)=>handleSort(0,"title",e)} >{order[0]?"up":"down"}</button></th>
                            <th scope="col" name = "date">Date <button onClick ={(e)=>handleSort(1,"date",e)} >{order[1]?"up":"down"}</button></th>
                            <th scope="col" name = "link">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table_data}
                    </tbody>
                </table>
                </div>
            </div>
        )


    }


    return (
    <div>
        
        {renderDashboard()} 
        
    </div>)
}