import DefaultImage from '../assets/images/1053244.png';
import { GoDotFill } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { usePage } from "@inertiajs/react";
import { toast, ToastContainer } from 'react-toastify';
import { TiMessageTyping } from "react-icons/ti";
import { LuSend } from "react-icons/lu";
import { Button, Modal } from "react-bootstrap";

export default function ActiveConversation ( {
                                                 activeConversation,
                                                 setActiveConversation,
                                                 messages,
                                                 onlineUsers,
                                                 isTyping,
                                                 setIsTyping
                                             } ) {
    
    const { auth }                            = usePage ().props;
    const messagesEndRef                      = useRef ( null );
    const [ isSending, setIsSending ]         = useState ( false );
    const [ message, setMessage ]             = useState ( '' );
    const [ selectedFiles, setSelectedFiles ] = useState ( [] );
    const [ showFileModal, setShowFileModal ] = useState ( false );
    const fileInputRef                        = useRef ( null );
    const conversationChannel                 = Echo.private ( `conversation.${ activeConversation?.id }` );
    
    const openFilePicker = () => fileInputRef.current.click ();
    
    const handleFilesSelected = ( e ) => {
        const files = Array.from ( e.target.files );
        setSelectedFiles ( ( prev ) => [ ...prev, ...files ] );
        setShowFileModal ( true );
    };
    
    const removeFile = ( index ) => {
        setSelectedFiles ( ( prev ) => prev.filter ( ( _, i ) => i !== index ) );
    };
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView ( { behavior: "smooth" } )
    }
    
    useEffect ( () => {
        scrollToBottom ()
    }, [ messages ] );
    
    function handleTyping ( e ) {
        setMessage ( e.target.value );
        
        conversationChannel.whisper ( 'typing', {
            user  : auth?.user,
            typing: true,
        } )
    }
    
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
    
    const sendFiles = async () => {
        if ( selectedFiles.length === 0 ) return;
        
        const formData = new FormData ();
        selectedFiles.forEach ( ( file ) => formData.append ( "files[]", file ) );
        
        setIsSending ( true );
        try {
            await axios
                .post ( `/conversations/${ activeConversation?.id }/send_files`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                } );
            setSelectedFiles ( [] );
            setShowFileModal ( false );
        }
        catch ( error ) {
            alert ( error?.response?.data || "Failed to send files" );
        }
        finally {
            setIsSending ( false );
        }
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
                            {
                                isTyping[ activeConversation.id ]?.typing &&
                                isTyping[ activeConversation.id ]?.user?.id !== auth?.user?.id ? (
                                        <p className="mb-0 text-gray fs-14">
                                            <TiMessageTyping className="text-light-green" /> typing
                                        </p>
                                    ) :
                                    ( () => {
                                        const isOnline = onlineUsers?.some ( user => user.id === activeConversation?.other_participant?.id );
                                        
                                        return isOnline ? (
                                            <p className="mb-0 text-gray fs-14">
                                                <GoDotFill className="text-light-green" /> Online
                                            </p>
                                        ) : (
                                            <p className="mb-0 text-gray fs-14">
                                                <GoDotFill className="text-gray" /> Offline
                                            </p>
                                        );
                                    } ) ()
                            }
                        </div>
                    </div>
                </div>
            </div>
            
            <ul className="list-unstyled active-conversation overflow-auto my-4 px-2 position-relative">
                {
                    messages[ activeConversation?.id ] &&
                    messages[ activeConversation?.id ].length > 0 &&
                    messages[ activeConversation?.id ].map ( ( message, index ) => {
                        const mediaFiles = message.media ? JSON.parse ( message.media ) : [];
                        
                        return (
                            <li className={ `d-flex flex-column justify-content-between gap-2 mb-4 ${
                                message.user_id === auth?.user?.id
                                    ? "align-items-end"
                                    : "align-items-baseline"
                            }` }
                                key={ index }>
                                
                                <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                                    <img src={ DefaultImage } alt="user"
                                         className="user-conversation-image rounded-circle border border-2" />
                                    <span className="fs-14 text-gray">
                                        { message.user_id === auth?.user?.id ? "You" : message?.user?.name }
                                    </span>
                                </div>
                                
                                <div className="bg-dark px-3 py-2 rounded-3 border border-dark text-white">
                                    { message.message && <p className="mb-2">{ message.message }</p> }
                                    
                                    { Array.isArray ( mediaFiles ) && mediaFiles.length > 0 && (
                                        <div className="d-flex flex-column gap-2">
                                            { mediaFiles.map ( ( file, i ) => {
                                                const fileName = "File Attached";
                                                const filePath =
                                                          typeof file === "string" ? file : file.path;
                                                
                                                return (
                                                    <div key={ i }
                                                         className="d-flex justify-content-between align-items-center bg-secondary rounded p-2 text-white">
                                                            <span className="text-truncate me-2">
                                                                <FaPaperclip className="text-white fs-14 me-1" />
                                                                { fileName }
                                                            </span>
                                                        <a href={ filePath } download target="_blank"
                                                           rel="noopener noreferrer"
                                                           className="btn btn-sm bg-light-green text-black border-0">
                                                            Download
                                                        </a>
                                                    </div>
                                                );
                                            } ) }
                                        </div>
                                    ) }
                                </div>
                            </li>
                        );
                    } )
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
                                   onChange={ handleTyping }
                                   className={ `form-control bg-body text-gray` } />
                            <div className="input-group-prepend">
                                <span className="input-group-text h-100 bg-body border-0"
                                      style={ { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, cursor: 'pointer' } }
                                      onClick={ openFilePicker }>
                                    <FaPaperclip className="text-gray" />
                                </span>
                            </div>
                        </div>
                        
                        <input
                            type="file"
                            ref={ fileInputRef }
                            multiple
                            onChange={ handleFilesSelected }
                            style={ { display: "none" } }
                        />
                    </form>
                </div>
            </div>
            
            <Modal size="lg" show={ showFileModal } onHide={ () => setShowFileModal ( false ) }
                   backdrop="static" keyboard={ false } className="border-0">
                <Modal.Header closeButton className="text-white border-body bg-dark">
                    <Modal.Title>Selected Files</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-gray bg-dark">
                    { selectedFiles.length === 0 ? (
                        <p>No files selected.</p>
                    ) : (
                        <ul className="list-group bg-dark">
                            {
                                selectedFiles.map ( ( file, index ) => (
                                    <li key={ index }
                                        className="list-group-item d-flex justify-content-between align-items-center bg-secondary text-white border-0 mb-2 rounded">
                                        <span>{ file.name }</span>
                                        <Button size="sm" variant="danger" onClick={ () => removeFile ( index ) }>
                                            Remove
                                        </Button>
                                    </li>
                                ) ) }
                        </ul>
                    ) }
                </Modal.Body>
                <Modal.Footer className="text-white border-body bg-dark">
                    <Button className="bg-dark-green border-0 text-white"
                            disabled={ isSending || selectedFiles.length === 0 } onClick={ sendFiles }>
                        { isSending ? "Sending..." : "Send Files" }
                    </Button>
                    <Button className="bg-secondary border-0 text-white" onClick={ () => setShowFileModal ( false ) }>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
