import { Link } from "react-router-dom"


export const BottomWarning = ({label, to, page}) => {
    return <div className="text-sm font-normal mt-2 mb-3">
        {label}
        <Link className="underline" to={to} >{page}</Link>
    </div>
}
