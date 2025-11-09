import Link from "next/link";



export default function Navbar(){
    return(
        <nav>

           <div className="navlist flex justify-around p-4 bg-gray-200">
             <div className="logo  gap-4 justify-around text-black text-2xl font-bold">
            <Link href={"/"} >Wvercel</Link>
            </div>
            <div className="navicon flex gap-4 justify-around  text-black text-lg font-medium">
            <Link href={"/about"} >About</Link>
            <Link href={"/users"} >Users</Link>
            </div>
           </div>
        </nav>
    )
}