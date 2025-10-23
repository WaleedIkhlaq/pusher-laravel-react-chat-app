<?php
    
    namespace App\Http\Controllers;
    
    use App\Http\Controllers\Controller;
    use App\Http\Requests\RegisterFormRequest;
    use App\Services\RegisterService;
    use Dflydev\DotAccessData\Exception\DataException;
    use Illuminate\Http\RedirectResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Log;
    use Inertia\Inertia;
    use Inertia\Response;
    
    class RegisterController extends Controller {
        
        public function __construct ( protected RegisterService $service ) {
        }
        
        public function index (): Response {
            return Inertia ::render ( 'Register/Index', [] );
        }
        
        public function register ( RegisterFormRequest $request ): RedirectResponse {
            try {
                DB ::beginTransaction ();
                $user = $this -> service -> store ( $request );
                DB ::commit ();
                
                if ( $user )
                    return redirect () -> back () -> with ( 'success', 'Account created successfully' );
                else
                    return redirect () -> back () -> withInput () -> with ( 'error', 'Something went wrong. Please try again.' );
            }
            catch ( \Exception | DataException $e ) {
                DB ::rollBack ();
                Log ::critical ( $e );
                return redirect () -> back () -> withErrors ( $e -> getMessage () ) -> withinput ();
            }
        }
        
    }
