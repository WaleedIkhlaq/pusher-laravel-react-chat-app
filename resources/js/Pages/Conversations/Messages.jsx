import { Head } from "@inertiajs/react";
import App from "@/Layouts/App.jsx";
import ActiveConversation from "@/Components/ActiveConversation.jsx";

function Messages ( { user } ) {
    return (
        <>
            <Head title="Conversations" />
            <div className="col-md-8">
                <ActiveConversation />
            </div>
        </>
    )
}

Messages.layout = page => <App children={ page } />

export default Messages;
