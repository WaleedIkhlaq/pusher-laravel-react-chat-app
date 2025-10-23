import Guest from "@/Layouts/Guest.jsx";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Errors from "@/Errors.jsx";

function Index () {
    
    const { data, setData, post, processing, errors, reset } = useForm ( {
                                                                             email   : '',
                                                                             password: '',
                                                                         } );
    
    function authenticate ( e ) {
        e.preventDefault ();
        post ( '/authenticate', {
            preserveScroll: false,
            onError       : () => reset ( 'password' ),
        } )
    }
    
    return (
        <>
            <Head title="Login" />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="form bg-dark mt-5 rounded-4 py-5 shadow-sm w-100">
                            <div className="formHeader text-center">
                                <h1>Hi, Welcome Back</h1>
                                <p>Enter your email and password to sign in</p>
                            </div>
                            
                            <div className="formBody d-flex justify-content-center align-items-center mt-5">
                                <Errors />
                                <form method="POST" className="w-75" onSubmit={ authenticate }>
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
                                               autoFocus={ true }
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
                                        Login
                                    </button>
                                </form>
                            </div>
                            <Link href="/sign-up"
                                  className="text-light-green text-center text-decoration-none mt-4 d-flex justify-content-center align-items-center gap-1 fs-14">
                                <span className="text-dark-green">Don't have an account?</span>
                                Create New
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
