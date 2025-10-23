import Sidebar from "@/Components/Sidebar.jsx";

export default function App ( { children } ) {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar />
                    { children }
                </div>
            </div>
        </>
    )
}
