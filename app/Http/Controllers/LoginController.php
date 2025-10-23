<?php
    
    namespace App\Http\Controllers;
    
    use App\Http\Requests\LoginFormRequest;
    use Dflydev\DotAccessData\Exception\DataException;
    use Illuminate\Http\RedirectResponse;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Log;
    use Inertia\Inertia;
    use Inertia\Response;
    
    class LoginController extends Controller {
        
        public function index (): Response {
            return Inertia ::render ( 'Login/Index', [] );
        }
        
        public function authenticate ( LoginFormRequest $request ): RedirectResponse {
            try {
                $email    = $request -> validated ( 'email' );
                $password = $request -> validated ( 'password' );
                
                if ( Auth ::attempt ( [ 'email' => $email, 'password' => $password ], true ) ) {
                    $request -> session () -> regenerate ();
                    return redirect () -> intended ( route ( 'conversations.index' ) );
                }
                else
                    return redirect () -> back () -> withErrors ( [ 'email' => 'Username or password is incorrect.' ] ) -> withInput ();
            }
            catch ( \Exception | DataException $e ) {
                Log ::critical ( $e );
                return redirect () -> back () -> withErrors ( $e -> getMessage () ) -> withinput ();
            }
        }
        
    }
