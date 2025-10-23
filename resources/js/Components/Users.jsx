import { Link, usePage } from "@inertiajs/react";
import DefaultImage from '../assets/images/1053244.png';
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { useState } from "react";

export default function Users () {
    const { props }           = usePage ();
    const [ users, setUsers ] = useState ( props?.users );
    
    return (
        <>
            <ul className="list-unstyled conversations pe-2 overflow-auto" style={ { height: '80vh' } }>
                {
                    users &&
                    users.length > 0 &&
                    users.map ( ( user, index ) => (
                        <li key={ index }>
                            <Link href={ `/conversations/${ user.id }/messages` }
                                  className={ `d-flex flex-row justify-content-between align-items-center py-3 ${ user.id === props?.user?.id ? 'bg-dark-green' : 'bg-body' } px-3 mb-3 gap-4 text-white text-decoration-none` }>
                                <img src={ DefaultImage } alt="CiCirclePlus"
                                     className="user-image rounded-circle" />
                                <div className="flex-1 flex-fill">
                                    <h5>{ user.name }</h5>
                                    <p className={ `mb-0 fs-14 ${ user.id === props?.user?.id ? 'bg-text-white' : 'text-gray' }` }>
                                        { user?.lastMessage?.message ?? 'Send a new message' }
                                    </p>
                                </div>
                                <div className="d-flex flex-column justify-content-between align-items-end gap-2">
                                    {
                                        user?.lastMessage &&
                                        (
                                            <>
                                                <p className={ `mb-0 ${ user.id === props?.user?.id ? 'bg-text-white' : 'text-gray' } fs-14 fst-italic` }>
                                                    { user?.lastMessage?.created_at }
                                                </p>
                                                
                                                {
                                                    user?.lastMessage?.read_at !== null
                                                        ? <LiaCheckDoubleSolid className="text-light-green" />
                                                        : <LiaCheckDoubleSolid className="text-gray" />
                                                }
                                            
                                            </>
                                        )
                                    }
                                </div>
                            </Link>
                        </li>
                    ) )
                }
            </ul>
        </>
    )
}
