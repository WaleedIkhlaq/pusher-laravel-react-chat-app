import { usePage } from '@inertiajs/react'

function Errors () {
    const { flash } = usePage ().props;
    
    return ( <>
        {
            flash.error &&
            flash.error.length > 0 &&
            (
                <div className="alert alert-danger border-0 alert-dismissible d-flex align-items-baseline w-75" role="alert">
                    <span className="alert-icon alert-icon-lg text-danger me-2">
                        <i className="ti ti-ban ti-sm"></i>
                    </span>
                    <div className="d-flex flex-column ps-1">
                        <h5 className="alert-heading mb-2">Error!</h5>
                        <p className="mb-0">{ flash.error }</p>
                    </div>
                </div>
            )
        }
        {
            flash.success &&
            flash.success.length > 0 &&
            (
                <div className="alert alert-success w-75" role="alert">
                    <div className="alert alert-success border-0 alert-dismissible d-flex align-items-baseline m-0 p-0"
                         role="alert">
                        <span className="alert-icon alert-icon-lg text-success me-2"><i
                            className="ti ti-check ti-sm"></i></span>
                        <div className="d-flex flex-column ps-1">
                            <h5 className="alert-heading mb-2">Success!</h5>
                            <p className="mb-0">{ flash.success }</p>
                        </div>
                    </div>
                </div>
            )
        }
    </> )
}

export default Errors
