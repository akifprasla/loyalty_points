function Content({data}){
    return (
        <div>
            {data.map((val)=>{
                return(
                    <div key={val.uid}>
                        <h2>Customer Name: {val.cust_name}</h2>
                        <h2>Customer Number: {val.cust_id}</h2>
                        <h2>Customer Points: {val.cust_points}</h2>
                        <h2>Last Purchase: {val.last_purchase}</h2>
                    </div>
            )
            })}
        </div>
    )
}

export default Content