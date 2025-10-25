import DefaultImage from '../assets/images/1053244.png';
import { GoDotFill } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { usePage } from "@inertiajs/react";
import { toast, ToastContainer } from 'react-toastify';

export default function ActiveConversation ( { activeConversation, setActiveConversation, messages } ) {
    
    const { auth }                    = usePage ().props;
    const messagesEndRef              = useRef ( null );
    const [ isSending, setIsSending ] = useState ( false );
    const [ message, setMessage ]     = useState ( '' );
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView ( { behavior: "smooth" } )
    }
    
    useEffect ( () => {
        scrollToBottom ()
    }, [ messages ] )
    
    function sendMessage ( e ) {
        e.preventDefault ();
        setIsSending ( true );
        axios
            .post ( `/conversations/${ activeConversation?.id }/send_message`, {
                message: message,
            } )
            .then ( function ( response ) {
                setIsSending ( false );
                setMessage ( '' );
            } )
            .catch ( function ( error ) {
                alert ( error?.response?.data );
                setIsSending ( false );
            } );
    }
    
    return (
        <>
            <div className="row">
                <div
                    className="d-flex flex-row justify-content-between align-items-center py-3 border-bottom border-dark bg-dark px-2">
                    <div className="d-flex flex-row justify-content-between align-items-center gap-3">
                        <img src={ DefaultImage } alt="Default Image" className="user-image rounded-circle" />
                        <div className="d-flex flex-column justify-content-center align-items-start gap-1">
                            <h5 className="mb-0">
                                {
                                    activeConversation.created_by === auth?.user?.id ?
                                        activeConversation.friendly_name :
                                        activeConversation?.user?.name
                                }
                            </h5>
                            <p className="mb-0 text-gray fs-14"><GoDotFill className="text-light-green" /> Online</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <ul className="list-unstyled active-conversation overflow-auto my-4 px-2">
                {
                    messages[ activeConversation?.id ] &&
                    messages[ activeConversation?.id ].length > 0 &&
                    messages[ activeConversation?.id ].map ( ( message, index ) => (
                        <li className={ `d-flex flex-column justify-content-between gap-2 mb-4 ${ message.user_id === auth?.user?.id ? 'align-items-end' : 'align-items-baseline' }` }
                            key={ index }>
                            <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                                <img src={ DefaultImage } alt="CiCirclePlus"
                                     className="user-conversation-image rounded-circle border border-2" />
                                <span className="fs-14 text-gray">
                                    {
                                        message.user_id === auth?.user?.id ?
                                            'You' :
                                            message?.user?.name
                                    }
                                </span>
                            </div>
                            <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                                <p className="mb-0">{ message.message }</p>
                            </div>
                        </li>
                    ) )
                }
                <div ref={ messagesEndRef }></div>
            </ul>
            
            <div className="row position-relative">
                <div style={ { top: '10px' } }
                     className="position-absolute d-flex flex-row justify-content-between align-items-center py-3 bg-dark px-2">
                    <form method="post" onSubmit={ sendMessage } className="w-100">
                        <div className="form-group input-group">
                            <input type="text"
                                   name="search"
                                   aria-label="Search"
                                   style={ { height: '45px' } }
                                   aria-describedby="search"
                                   placeholder="Type a message..."
                                   autoFocus={ true }
                                   required={ true }
                                   value={ message }
                                   readOnly={ isSending }
                                   onChange={ ( e ) => setMessage ( e.target.value ) }
                                   className={ `form-control bg-body text-gray` } />
                            <div className="input-group-prepend">
                                <span className="input-group-text h-100 bg-body border-0"
                                      style={ { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }
                                      id="search">
                                    <FaPaperclip className="text-gray" />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
