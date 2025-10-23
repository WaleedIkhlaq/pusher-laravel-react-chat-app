import DefaultImage from '../assets/images/1053244.png';
import { GoDotFill } from "react-icons/go";
import { useEffect, useRef } from "react";
import { FaPaperclip, FaSearch } from "react-icons/fa";

export default function ActiveConversation () {
    
    const messagesEndRef = useRef ( null );
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView ( { behavior: "smooth" } )
    }
    
    useEffect ( () => {
        scrollToBottom ()
    }, [] );
    
    
    return (
        <>
            <div className="row">
                <div
                    className="d-flex flex-row justify-content-between align-items-center py-3 border-bottom border-dark bg-dark px-2">
                    <div className="d-flex flex-row justify-content-between align-items-center gap-3">
                        <img src={ DefaultImage } alt="Default Image" className="user-image rounded-circle" />
                        <div className="d-flex flex-column justify-content-center align-items-start gap-1">
                            <h5 className="mb-0">Waleed Ikhlaq</h5>
                            <p className="mb-0 text-gray fs-14"><GoDotFill className="text-light-green" /> Online</p>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="list-unstyled active-conversation overflow-auto my-4 px-2">
                <li className="d-flex flex-column justify-content-between align-items-baseline gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                
                <li className="d-flex flex-column justify-content-between align-items-end gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                
                <li className="d-flex flex-column justify-content-between align-items-baseline gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                <li className="d-flex flex-column justify-content-between align-items-baseline gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                
                <li className="d-flex flex-column justify-content-between align-items-end gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                
                <li className="d-flex flex-column justify-content-between align-items-baseline gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                <li className="d-flex flex-column justify-content-between align-items-baseline gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                
                <li className="d-flex flex-column justify-content-between align-items-end gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                
                <li className="d-flex flex-column justify-content-between align-items-baseline gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                <li className="d-flex flex-column justify-content-between align-items-baseline gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                
                <li className="d-flex flex-column justify-content-between align-items-end gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                
                <li className="d-flex flex-column justify-content-between align-items-baseline gap-2 mb-4">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-conversation-image rounded-circle border border-2" />
                        <span className="fs-14 text-gray">James Bond</span>
                    </div>
                    <div className="bg-dark px-2 py-2 rounded-3 border border-dark">
                        <p className="mb-0">Hello, how are you doing?</p>
                    </div>
                </li>
                
                <div ref={ messagesEndRef }></div>
            </ul>
            <div className="row position-relative">
                <div style={ { top: '10px' } }
                     className="position-absolute d-flex flex-row justify-content-between align-items-center py-3 bg-dark px-2">
                    <div className="form-group input-group">
                        <input type="text" name="search" aria-label="Search" style={ { height: '45px' } }
                               aria-describedby="search" placeholder="Search for chats" autoFocus={ true }
                               required={ true }
                               className="form-control bg-body text-gray" />
                        <div className="input-group-prepend">
                        <span className="input-group-text h-100 bg-body border-0"
                              style={ { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }
                              id="search">
                            <FaPaperclip className="text-gray" />
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
