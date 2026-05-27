import Dashboard from "../components/Dashboard";
import AI from "../components/AI";

const HomePage = ({buckets , onExpenseAdded}) =>{
    return(
        <div>
            <h1 style={{textAlign:'center',marginButton:'30px'}}>המערכת הפיננסית שלי 💰</h1>
            <Dashboard buckets={buckets}/>
            <AI onExpenseAdded={onExpenseAdded}/>
        </div>
    );
};

export default HomePage;





