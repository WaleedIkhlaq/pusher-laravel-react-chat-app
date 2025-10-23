import { Head } from "@inertiajs/react";
import App from "@/Layouts/App.jsx";
import MainImage from '../../assets/images/main-image.png';
import { useState } from 'react';
import ActiveConversation from "@/Components/ActiveConversation.jsx";

function Index () {
    const [ activeConversation, setActiveConversation ] = useState ( true );
    return (
        <>
            <Head title="Conversations" />
            <div className="col-md-8">
                {
                    activeConversation ?
                        <ActiveConversation /> :
                        <div
                            className="main-image-container w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                            <img src={ MainImage } alt="MainImage" className="w-25" />
                            <h1 className="mt-3">Hi, Welcome Back</h1>
                            <p className="w-50 text-gray text-center">
                                Ready to chat with everyone? Choose from your sidebar to start chat with anyone or add
                                new
                                friends to get started.
                            </p>
                        </div>
                }
            </div>
        </>
    )
}

Index.layout = page => <App children={ page } />

export default Index;
