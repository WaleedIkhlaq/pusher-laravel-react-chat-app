import { Link, usePage } from "@inertiajs/react";
import DefaultImage from '../assets/images/1053244.png';
import { LiaCheckDoubleSolid } from "react-icons/lia";

export default function Conversations () {
    return (
        <>
            <ul className="list-unstyled conversations">
                <li>
                    <Link href="#"
                          className="d-flex flex-row justify-content-between align-items-center py-3 bg-body px-3 mb-3 gap-4 text-white text-decoration-none">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-image rounded-circle" />
                        <div className="flex-1 flex-fill">
                            <h5>Waleed Ikhlaq</h5>
                            <p className="mb-0 text-gray fs-14">Hi there I ope you are doing well!</p>
                        </div>
                        <div className="d-flex flex-column justify-content-between align-items-end gap-2">
                            <p className="mb-0 text-gray fs-14 fst-italic">2:45 PM</p>
                            <LiaCheckDoubleSolid className="text-light-green" />
                        </div>
                    </Link>
                </li>
                
                <li>
                    <Link href="#"
                          className="d-flex flex-row justify-content-between align-items-center py-3 bg-dark-green px-3 mb-3 gap-4 text-white text-decoration-none">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-image rounded-circle" />
                        <div className="flex-1 flex-fill">
                            <h5>Waleed Ikhlaq</h5>
                            <p className="mb-0 text-white fs-14">Hi there I ope you are doing well!</p>
                        </div>
                        <div className="d-flex flex-column justify-content-between align-items-end gap-2">
                            <p className="mb-0 text-white fs-14 fst-italic">2:45 PM</p>
                            <LiaCheckDoubleSolid className="text-light-green" />
                        </div>
                    </Link>
                </li>
                
                <li>
                    <Link href="#"
                          className="d-flex flex-row justify-content-between align-items-center py-3 bg-body px-3 mb-3 gap-4 text-white text-decoration-none">
                        <img src={ DefaultImage } alt="CiCirclePlus"
                             className="user-image rounded-circle" />
                        <div className="flex-1 flex-fill">
                            <h5>Waleed Ikhlaq</h5>
                            <p className="mb-0 text-gray fs-14">Hi there I ope you are doing well!</p>
                        </div>
                        <div className="d-flex flex-column justify-content-between align-items-end gap-2">
                            <p className="mb-0 text-gray fs-14 fst-italic">2:45 PM</p>
                            <LiaCheckDoubleSolid className="text-light-green" />
                        </div>
                    </Link>
                </li>
            </ul>
        </>
    )
}
