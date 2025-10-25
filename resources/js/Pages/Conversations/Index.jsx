import { Head, usePage } from "@inertiajs/react";
import App from "@/Layouts/App.jsx";
import MainImage from '../../assets/images/main-image.png';
import Topbar from "@/Components/Topbar.jsx";
import Search from "@/Components/Search.jsx";
import Conversations from "@/Components/Conversations.jsx";
import { useEffect, useState } from "react";
import Create from "@/Pages/Conversations/Create.jsx";
import { Bounce, ToastContainer } from "react-toastify";

function Index () {
    
    const { props }                           = usePage ();
    const [ showModal, setShowModal ]         = useState ( false );
    const [ conversations, setConversations ] = useState ( props.conversations ?? [] );
    
    useEffect ( () => {
        if ( !props?.auth?.user ) return;
        
        Echo.private ( `user.${ props?.auth?.user?.id }` )
            .listen ( "ConversationCreated", ( e ) => {
                console.log ( 'Conversation created' );
                setConversations ( prev => [ e.conversation, ...prev ] );
            } );
        
    }, [ props?.auth?.user?.id ] );
    
    function toggleModal () {
        setShowModal ( !showModal );
    }
    
    return (
        <>
            <Head title="Conversations" />
            
            <ToastContainer
                position="top-right"
                autoClose={ 5000 }
                hideProgressBar={ false }
                newestOnTop={ false }
                closeOnClick={ false }
                rtl={ false }
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={ Bounce }
            />
            
            <Create
                showModal={ showModal }
                toggleModal={ toggleModal } />
            
            <div className="container-fluid">
                <div className="row">
                    <div className="sidebar bg-dark vh-100 col-md-4">
                        <Topbar toggleModal={ toggleModal } />
                        <Search />
                        <Conversations
                            conversations={ conversations }
                        />
                    </div>
                    <div className="col-md-8">
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
                    </div>
                </div>
            </div>
        </>
    )
}

Index.layout = page => <App children={ page } />

export default Index;
