import { Button, Modal } from "react-bootstrap";
import { usePage } from "@inertiajs/react";
import DefaultImage from "@/assets/images/1053244.png";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Create ( { showModal, toggleModal } ) {
    
    const { users }                         = usePage ().props;
    const [ isConnecting, setIsConnecting ] = useState ( false );
    const [ error, setError ]               = useState ( '' );
    const userRefs                          = useRef ( {} );
    
    function createConversation ( user ) {
        if ( user && user.id > 0 ) {
            setIsConnecting ( true );
            axios.post ( `/conversations/${ user.id }/create`, {
                     user: user.id,
                 } )
                 .then ( ( response ) => {
                     setIsConnecting ( false );
                     if ( userRefs.current[ user.id ] ) {
                         userRefs.current[ user.id ].style.display = "none";
                     }
                     toast ( 'Conversation created successfully.' );
                 } )
                 .catch ( ( err ) => {
                     setError ( err?.response?.data?.message );
                     setIsConnecting ( false );
                 } )
        }
    }
    
    return (
        <>
            <Modal size="lg" show={ showModal } onHide={ toggleModal } backdrop="static" keyboard={ false }
                   className="border-0">
                <Modal.Header closeButton className="text-white border-body bg-dark">
                    <Modal.Title>Start new conversation</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-gray bg-dark">
                    {
                        error &&
                        error.length > 0 &&
                        <p className="text-danger fw-bold">{ error }</p>
                    }
                    <ul className="list-unstyled conversations pe-2 overflow-auto" style={ { height: "60vh" } }>
                        {
                            users &&
                            users.length > 0 &&
                            users.map ( ( user, index ) => (
                                <li key={ index } ref={ ( el ) => ( userRefs.current[ user.id ] = el ) }>
                                    <div
                                        className="d-flex flex-row justify-content-between align-items-center py-3 bg-body px-3 mb-3 gap-4 text-white text-decoration-none">
                                        <img src={ DefaultImage } alt="CiCirclePlus"
                                             className="user-image rounded-circle" />
                                        <div className="flex-1 flex-fill">
                                            <h5>{ user.name }</h5>
                                            <p className="mb-0 text-gray fs-14">{ user.email }</p>
                                        </div>
                                        <div
                                            className="d-flex flex-column justify-content-between align-items-end gap-2">
                                            <button className="btn bg-dark-green border-light-green text-white"
                                                    disabled={ isConnecting }
                                                    onClick={ () => createConversation ( user ) }>
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ) )
                        }
                    </ul>
                </Modal.Body>
                <Modal.Footer className="text-white border-body bg-dark">
                    <Button className="bg-dark-green border-0 text-white" onClick={ toggleModal }>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Create;
