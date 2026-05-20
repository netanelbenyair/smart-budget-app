import { useEffect, useState } from "react";


const Dashboard = () => {

    const [buckets , setBuckets] = useState([]);

    useEffect(()=>{
        const fetchBuckets = async()=>{
            try{
                const response = await fetch('http://localhost:4000/api/buckets')
                if(!response.ok) throw new Error('בעיה בשרת')

                    const data = await response.json();
                    console.log(data);
                    
                    setBuckets(data);
                }
                catch(error){
                    console.error("error fetching buckets:" ,error);
                    
                }
        } 

        fetchBuckets();
    },[])



 return (
        <div className="dashboard-container">
            <h2>הקופסאות שלי</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {buckets.map(bucket => (
                    // כאן אנחנו עוברים בלולאה (map) על כל הקופסאות ומייצרים כרטיסייה לכל אחת
                    <div key={bucket.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', minWidth: '200px', backgroundColor: 'white' }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>{bucket.name}</h3>
                        <p style={{ margin: 0 }}>
                            נוצל: <strong style={{color:bucket.current_spending > bucket.monthly_budget? 'red': 'black'}}>{bucket.current_spending}</strong> / {bucket.monthly_budget} ₪
                        </p>
                        {/* מלבן חיצוני - הרקע האפור */}
                         
<div style={{ width: '100%', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', marginTop: '10px', overflow: 'hidden' }}>
   
    {/* מלבן פנימי - פס ההתקדמות הצבעוני */}
    <div style={{ 
        height: '100%', 
        backgroundColor: '#4caf50', 
        width: `${(bucket.current_spending /bucket.monthly_budget)*100}%`
    }}></div>

</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
