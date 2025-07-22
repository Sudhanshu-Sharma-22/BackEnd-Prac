import { Link } from "react-router-dom";


export function BottomWarning({label,buttonText,to}){
    return <div className="flex justify-centre py-2 text-sm">
        <div className="py-2 text-sm flex justify-centre">
            {label}
        </div>
        <Link to={to} className="pointer underline pl-1 cursor-pointer">
            {buttonText}
        </Link>
    </div>
}