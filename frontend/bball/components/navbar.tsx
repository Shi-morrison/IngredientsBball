
export default function Navbar() {
    return (
        <>
            <nav className="nav text-black bg-primary flex flex-row justify-between items-center gap-8 px-8  ">
                <a href="/" className="title"><h1>Site name</h1></a>
                <a href=""><h3>Player Compare</h3></a>
                <ul className="flex gap-6">
                    <li>
                        <a href=""><h3>search bar</h3></a>
                    </li>
                    <li>
                        <a href=""><h3>account</h3></a>
                    </li>
                </ul>

            </nav>

        </>
    );
}
