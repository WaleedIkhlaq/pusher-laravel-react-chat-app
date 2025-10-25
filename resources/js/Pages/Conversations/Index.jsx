import { Head, usePage } from "@inertiajs/react";
import App from "@/Layouts/App.jsx";
import MainImage from '../../assets/images/main-image.png';
import Topbar from "@/Components/Topbar.jsx";
import Search from "@/Components/Search.jsx";
import Conversations from "@/Components/Conversations.jsx";
import { useEffect, useState } from "react";
import Create from "@/Pages/Conversations/Create.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import ActiveConversation from "@/Components/ActiveConversation.jsx";

function Index () {
    
    const { props }                                     = usePage ();
    const [ showModal, setShowModal ]                   = useState ( false );
    const [ conversations, setConversations ]           = useState ( props.conversations ?? [] );
    const [ messages, setMessages ]                     = useState ( {} );
    const [ activeConversation, setActiveConversation ] = useState ( null );
    
    useEffect ( () => {
        
        const userChannel   = Echo.private ( `user.${ props?.auth?.user?.id }` );
        const onlineChannel = Echo.join ( "online" );
        
        userChannel
            .listen ( "ConversationCreated", ( e ) => {
                const conversation = e.conversation;
                
                if ( conversation && conversation.id > 0 ) {
                    setConversations ( ( prev ) => {
                        const updatedList = prev.map ( ( conv ) => conv.id === conversation.id ? conversation : conv );
                        
                        return updatedList
                            .sort ( ( a, b ) => new Date ( getConversationTimestamp ( b ) ) - new Date ( getConversationTimestamp ( a ) ) );
                    } );
                }
            } )
            .listen ( "ConversationUpdated", ( e ) => {
                console.log ( 'conversation updated' );
                const conversation = e.conversation;
                setConversations ( ( prev ) => {
                    const updatedList = prev.map ( ( conv ) => conv.id === conversation.id ? conversation : conv );
                    
                    return updatedList
                        .sort ( ( a, b ) => new Date ( getConversationTimestamp ( b ) ) - new Date ( getConversationTimestamp ( a ) ) );
                } );
            } )
            .listen ( "MessageSent", ( e ) => {
                const message = e.message;
                console.log ( 'Messaged added' );
                setMessages ( ( prev ) => ( {
                    ...prev,
                    [ message.conversation_id ]: [
                        ...( prev[ message.conversation_id ] || [] ),
                        message,
                    ],
                } ) );
            } );
        
        onlineChannel
            .here ( ( users ) => {
                console.log ( 'user is here' );
            } )
            .joining ( ( user ) => {
                console.log ( 'user joined' );
            } )
            .leaving ( ( user ) => {
                console.log ( 'user left' );
            } )
            .error ( ( error ) => {
                console.error ( error );
            } );
        
        return () => {
            Echo.leave ( `user.${ props?.auth?.user?.id }` );
            Echo.leave ( "online" );
        };
        
    }, [] );
    
    useEffect ( () => {
        if ( activeConversation && activeConversation.id > 0 ) {
            axios
                .get ( `/conversations/${ activeConversation.id }/messages` )
                .then ( ( response ) => {
                    setMessages ( ( prev ) => ( {
                        ...prev,
                        [ activeConversation.id ]: response.data.messages,
                    } ) );
                } )
                .catch ( ( error ) => {
                    console.error ( error );
                } );
        }
    }, [ activeConversation?.id ] )
    
    
    function getConversationTimestamp ( conversation ) {
        return conversation.last_message?.created_at || conversation.created_at;
    }
    
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
                            activeConversation={ activeConversation }
                            setActiveConversation={ setActiveConversation }
                        />
                    </div>
                    <div className="col-md-8">
                        {
                            activeConversation === null ? (
                                <div
                                    className="main-image-container w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                                    <img src={ MainImage } alt="MainImage" className="w-25" />
                                    <h1 className="mt-3">Hi, Welcome Back</h1>
                                    <p className="w-50 text-gray text-center">
                                        Ready to chat with everyone? Choose from your sidebar to start chat with anyone
                                        or add
                                        new
                                        friends to get started.
                                    </p>
                                </div>
                            ) : (
                                <ActiveConversation
                                    activeConversation={ activeConversation }
                                    setActiveConversation={ setActiveConversation }
                                    messages={ messages }
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

Index.layout = page => <App children={ page } />

export default Index;
