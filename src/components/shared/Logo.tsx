import { Link } from "react-router-dom"
export const Logo = () =>{
    return (
    <Link to='/' className={` text-2xl font-bold tracking-tighter transition-all`}>
        <p className="hidden lg:block">
            Tech
            <span className="text-cyan-600">Full</span>
        </p>
        <p className="lg:hidden flex text-4xl">
            <span className='-skew-x-6'>T</span>
            <span className="text-cyan-600 skew-x-6">F</span>
        </p>
    </Link>
    )
}