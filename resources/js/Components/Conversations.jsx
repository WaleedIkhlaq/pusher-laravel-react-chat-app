import { Link, usePage } from "@inertiajs/react";
import DefaultImage from '../assets/images/1053244.png';
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { useEffect, useState } from "react";

export default function Conversations ( { conversations, activeConversation, setActiveConversation } ) {
    
    const { props } = usePage ();
    
    // const conversations = document.querySelectorAll ( ".conversation" );
    //
    // useEffect ( () => {
    //     conversations.forEach ( ( user ) => {
    //         const name         = user.textContent.toLowerCase ();
    //         user.style.display = name.includes ( search ) ? "block" : "none";
    //     } );
    // }, [ search ] );
    
    function handleActiveConversation ( conversation ) {
        if ( activeConversation?.id !== conversation.id )
            setActiveConversation ( conversation );
    }
    
    function formatTime ( timestamp ) {
        if ( !timestamp ) return '';
        const date = new Date ( timestamp );
        return date.toLocaleTimeString ( [], {
            hour  : 'numeric',
            minute: '2-digit',
            hour12: true,
        } );
    }
    
    return (
        <>
            <ul
                className="list-unstyled conversations pe-2 overflow-auto"
                style={ { height: "80vh" } }
            >
                {
                    conversations &&
                    conversations.length > 0 &&
                    conversations.map ( ( conversation, index ) => (
                        <li key={ index } className="conversation"
                            onClick={ () => handleActiveConversation ( conversation ) }>
                            <div
                                className={ `d-flex flex-row justify-content-between conversation align-items-center py-3 ${
                                    conversation.id === activeConversation?.id
                                        ? "bg-dark-green"
                                        : "bg-body"
                                } px-3 mb-3 gap-4 text-white text-decoration-none` }
                            >
                                <img
                                    src={ DefaultImage }
                                    alt="User"
                                    className="user-image rounded-circle"
                                />
                                <div className="flex-1 flex-fill">
                                    <h5>
                                        {
                                            conversation.created_by === props?.auth?.user?.id ?
                                                conversation.friendly_name :
                                                conversation?.user?.name
                                        }
                                    </h5>
                                    <p
                                        className={ `mb-0 fs-14 ${
                                            conversation.id === activeConversation?.id
                                                ? "bg-text-white"
                                                : "text-gray"
                                        }` }
                                    >
                                        { conversation?.last_message?.message ?? "Send a new message" }
                                    </p>
                                </div>
                                <div className="d-flex flex-column justify-content-between align-items-end gap-2">
                                    { conversation?.last_message && (
                                        <>
                                            <p
                                                className={ `mb-0 ${
                                                    conversation.id === activeConversation?.id
                                                        ? "bg-text-white"
                                                        : "text-gray"
                                                } fs-14 fst-italic` }
                                            >
                                                { formatTime ( conversation?.last_message?.created_at ) }
                                            </p>
                                            
                                            <LiaCheckDoubleSolid className="text-gray" />
                                        </>
                                    ) }
                                </div>
                            </div>
                        </li>
                    ) )
                }
            </ul>
        </>
    );
}
