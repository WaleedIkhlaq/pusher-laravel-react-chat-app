import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function Search () {
    const [ search, setSearch ] = useState ( '' );
    
    return (
        <>
            <div
                className="d-flex justify-content-between align-items-center py-3 position-relative border-bottom border-body mb-3">
                <div className="form-group input-group">
                    <input type="text" name="search" aria-label="Search"
                           onKeyUp={ ( e ) => setSearch ( e.target.value ) }
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
        </>
    )
}
