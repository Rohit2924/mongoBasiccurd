import Link from "next/link";

export default function hero() {

    return(
        <nav className="flex justify-around items-center bg-slate-800 px-8 py-3">
            <Link href={"/"} >Hero Component</Link>
            <Link href={"/addTopic"} >Add</Link>
        </nav>
    )
}
