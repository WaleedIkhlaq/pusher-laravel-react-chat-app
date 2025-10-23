import { usePage } from "@inertiajs/react";
import { CiCirclePlus } from "react-icons/ci";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import DefaultImage from '../assets/images/1053244.png';
import Conversations from "@/Components/Conversations.jsx";
import axios from "axios";
import Create from "@/Pages/Conversations/Create.jsx";
import { useState } from "react";

export default function Sidebar () {
    const { props }                   = usePage ();
    const [ showModal, setShowModal ] = useState ( false );
    
    function createNewConversation () {
        axios.get ( '/conversations/create' )
             .then ( ( response ) => {
                 console.log ( response.data );
             } )
             .catch ( ( error ) => {
                 console.log ( error );
             } )
    }
    
    const toggleModal = () => setShowModal ( !showModal );
    
    return (
        <>
            <Create
                showModal={ showModal }
                users={ props.users }
                toggleModal={ toggleModal } />
            
            <div className="sidebar bg-dark vh-100 col-md-4">
                <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-body">
                    <h3 className="mb-0">{ props.appName }</h3>
                    <div className="d-flex justify-content-end gap-3 align-items-center icons">
                        <img src={ DefaultImage } className="user-profile-image rounded-circle border border-bottom p-1"
                             alt={ props.auth?.user?.name } />
                        <CiCirclePlus
                            onClick={ toggleModal }
                            className="bg-dark-green rounded-circle p-1 new-chat-icon" />
                        <FaPowerOff className="bg-danger p-2 rounded-circle text-white new-chat-icon" />
                        <GiHamburgerMenu className="bg-body p-2 rounded-circle new-chat-icon" />
                    </div>
                </div>
                
                <div
                    className="d-flex justify-content-between align-items-center py-3 position-relative border-bottom border-body">
                    <div className="form-group input-group">
                        <input type="text" name="search" aria-label="Search"
                               aria-describedby="search" placeholder="Search for chats"
                               className="form-control bg-body text-gray" />
                        <div className="input-group-prepend">
                            <span className="input-group-text h-100 bg-body border-0"
                                  style={ { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }
                                  id="search">
                                <FaSearch className="text-gray" />
                            </span>
                        </div>
                    </div>
                </div>
                
                <Conversations />
            </div>
        </>
    )
}
