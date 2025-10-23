import Guest from "@/Layouts/Guest.jsx";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaEnvelope, FaLock, FaRegUser } from "react-icons/fa";
import Errors from "@/Errors.jsx";

function Index () {
    
    const { data, setData, post, processing, errors, reset } = useForm ( {
                                                                             name    : '',
                                                                             email   : '',
                                                                             password: '',
                                                                         } );
    
    function handleSubmit ( e ) {
        e.preventDefault ();
        post ( '/sign-up', {
            preserveScroll: false,
            onSuccess     : () => reset (),
            onError       : () => reset ( 'password' ),
        } )
    }
    
    return (
        <>
            <Head title="Create Your Account" />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="form bg-dark mt-5 rounded-4 py-5 shadow-sm w-100">
                            <div className="formHeader text-center">
                                <h1>Lets Get Started</h1>
                                <p>Join us here, a better place for every conversation</p>
                            </div>
                            <div className="formBody flex-column d-flex justify-content-center align-items-center mt-5">
                                <Errors />
                                <form method="POST" className="w-75" onSubmit={ handleSubmit }>
                                    <div className="form-group input-group mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text h-100 bg-body border-0"
                                                  id="name">
                                                <FaRegUser className="text-gray" />
                                            </span>
                                        </div>
                                        <input type="text"
                                               value={ data.name }
                                               onChange={ e => setData ( "name", e.target.value ) }
                                               className={ `form-control bg-body text-gray ${ errors.name ? 'input-error' : '' }` }
                                               required={ true }
                                               autoFocus={ true }
                                               name="name"
                                               placeholder="John Doe"
                                               aria-label="name Address"
                                               aria-describedby="name" />
                                        { errors.name &&
                                          <div
                                              className="text-danger fs-7 w-100 float-start mt-1">{ errors.name }</div> }
                                    </div>
                                    
                                    <div className="form-group input-group mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text h-100 bg-body border-0"
                                                  id="email-address">
                                                <FaEnvelope className="text-gray" />
                                            </span>
                                        </div>
                                        <input type="email"
                                               value={ data.email }
                                               onChange={ e => setData ( "email", e.target.value ) }
                                               className={ `form-control bg-body text-gray ${ errors.name ? 'input-error' : '' }` }
                                               required={ true }
                                               name="email"
                                               placeholder="johndoe@example.com"
                                               aria-label="Email Address"
                                               aria-describedby="email-address" />
                                        { errors.email &&
                                          <div
                                              className="text-danger fs-7 w-100 float-start mt-1">{ errors.email }</div> }
                                    </div>
                                    
                                    <div className="form-group input-group mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text h-100 bg-body border-0"
                                                  id="password">
                                                <FaLock className="text-gray" />
                                            </span>
                                        </div>
                                        <input type="password"
                                               onChange={ e => setData ( "password", e.target.value ) }
                                               className={ `form-control bg-body text-gray ${ errors.name ? 'input-error' : '' }` }
                                               required={ true }
                                               name="password"
                                               placeholder="****************"
                                               aria-label="Password"
                                               aria-describedby="password" />
                                        { errors.password &&
                                          <div
                                              className="text-danger fs-7 w-100 float-start mt-1">{ errors.password }</div> }
                                    </div>
                                    
                                    <button type="submit" disabled={ processing }
                                            className="btn btn-primary bg-light-green fs-5 text-uppercase w-100 border-0">
                                        Sign Up
                                    </button>
                                </form>
                            </div>
                            <Link href="/"
                                  className="text-light-green text-center text-decoration-none mt-4 d-flex justify-content-center align-items-center gap-1 fs-14">
                                <span className="text-dark-green">Already have an account?</span>
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Index.layout = page => <Guest children={ page } />

export default Index;
