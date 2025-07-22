import {AppBar} from "../components/AppBar"
import {Balance} from "../components/Balance"
import {Users} from "../components/Users"

export const Dashboard = function(){
    return <div>
        <AppBar></AppBar>
        <div>
            <Balance className="m-8" value={"10000"}></Balance>
            <Users></Users>
        </div>
    </div>
}