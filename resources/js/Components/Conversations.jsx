import { Link, usePage } from "@inertiajs/react";
import DefaultImage from '../assets/images/1053244.png';
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

export default function Conversations ( {
                                            conversations,
                                            activeConversation,
                                            setActiveConversation,
                                            onlineUsers,
                                            searchText
                                        } ) {
    
    const { props }       = usePage ();
    const conversationsEl = document.querySelectorAll ( ".conversation" );
    
    useEffect ( () => {
        conversationsEl.forEach ( ( user ) => {
            const name         = user.textContent.toLowerCase ();
            user.style.display = name.includes ( searchText ) ? "block" : "none";
        } );
    }, [ searchText ] );
    
    function handleActiveConversation ( conversation ) {
        if ( activeConversation?.id !== conversation.id )
            setActiveConversation ( conversation );
    }
    
    function formatTime ( timestamp ) {
        if ( !timestamp ) return '';
        
        const date = new Date ( timestamp );
        return date.toLocaleString ( 'en-US', {
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
                                <div className="position-relative">
                                    <img src={ DefaultImage } alt="User" className="user-image rounded-circle" />
                                    {
                                        ( () => {
                                            const isOnline = onlineUsers?.some ( user => user.id === conversation?.other_participant?.id );
                                            
                                            return isOnline ? (
                                                <GoDotFill
                                                    style={ {
                                                        bottom: '-12px',
                                                        right : '-9px',
                                                    } }
                                                    className="text-dark-green fs-2 position-absolute"
                                                />
                                            ) : (
                                                <GoDotFill
                                                    style={ {
                                                        bottom: '-12px',
                                                        right : '-9px',
                                                    } }
                                                    className="text-gray fs-2 position-absolute"
                                                />
                                            )
                                        } ) ()
                                    }
                                </div>
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
                                        {
                                            conversation?.last_message?.message !== null ?
                                                conversation?.last_message?.message :
                                                (
                                                    conversation?.last_message?.media !== null ?
                                                        'Media message' :
                                                        'Send a new message'
                                                )
                                        }
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
                                            
                                            <LiaCheckDoubleSolid
                                                className={ conversation?.read_status === 'read' ? 'text-light-green' : 'text-gray' } />
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
