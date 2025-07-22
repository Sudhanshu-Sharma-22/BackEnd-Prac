
export const Balance=function({value}){
    return <div>
        <div className="font-bold text-lg">
            Your Balance
        </div>
        <div className="font-semibold text-lg ml-4">
            Rs {value}
        </div>
    </div>
}