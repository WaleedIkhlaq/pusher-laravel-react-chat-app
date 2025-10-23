import { Button, Modal } from "react-bootstrap";
import { Link } from "@inertiajs/react";
import DefaultImage from "@/assets/images/1053244.png";
import { LiaCheckDoubleSolid } from "react-icons/lia";

function Create ( { showModal, toggleModal, users } ) {
    
    return (
        <>
            <Modal size="lg" show={ showModal } onHide={ toggleModal } backdrop="static" keyboard={ false }
                   className="border-0">
                <Modal.Header closeButton className="text-white border-body bg-dark">
                    <Modal.Title>Start new conversation</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-gray bg-dark">
                    <ul className="list-unstyled conversations pe-2 overflow-auto" style={ { height: "60vh" } }>
                        {
                            users &&
                            users.length > 0 &&
                            users.map ( ( user, index ) => (
                                <li key={ index }>
                                    <Link href="#"
                                          className="d-flex flex-row justify-content-between align-items-center py-3 bg-body px-3 mb-3 gap-4 text-white text-decoration-none">
                                        <img src={ DefaultImage } alt="CiCirclePlus"
                                             className="user-image rounded-circle" />
                                        <div className="flex-1 flex-fill">
                                            <h5>{ user.name }</h5>
                                            <p className="mb-0 text-gray fs-14">{ user.email }</p>
                                        </div>
                                        <div
                                            className="d-flex flex-column justify-content-between align-items-end gap-2">
                                            <button className="btn bg-dark-green border-light-green text-white">
                                                Start New Chat
                                            </button>
                                        </div>
                                    </Link>
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
