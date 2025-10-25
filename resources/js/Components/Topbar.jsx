import { Link, usePage } from "@inertiajs/react";
import { FaPlus, FaPowerOff } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import DefaultImage from '../assets/images/1053244.png';

export default function Topbar ( { toggleModal } ) {
    const { props } = usePage ();
    
    return (
        <>
            <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-body">
                <h3 className="mb-0">{ props.appName }</h3>
                <div className="d-flex justify-content-end gap-3 align-items-center icons">
                    <span className="fs-14 text-gray">{ props.auth?.user?.name }</span>
                    <img src={ DefaultImage } className="user-profile-image rounded-circle border border-bottom p-1"
                         alt={ props.auth?.user?.name } title={ props.auth?.user?.name } />
                    <FaPlus className="bg-dark-green p-2 rounded-circle new-chat-icon" onClick={ toggleModal } />
                    <Link href="/logout" method="post" className="bg-transparent shadow-none p-0 border-0">
                        <FaPowerOff className="bg-danger p-2 rounded-circle text-white new-chat-icon" />
                    </Link>
                </div>
            </div>
        </>
    )
}
