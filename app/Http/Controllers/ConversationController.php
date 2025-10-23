<?php
    
    namespace App\Http\Controllers;
    
    use App\Events\MessageSent;
    use App\Http\Controllers\Controller;
    use App\Http\Requests\MessageFormRequest;
    use App\Models\User;
    use App\Services\ConversationService;
    use App\Services\MessageService;
    use App\Services\UserService;
    use Dflydev\DotAccessData\Exception\DataException;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\RedirectResponse;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Log;
    use Inertia\Inertia;
    use Inertia\Response;
    
    class ConversationController extends Controller {
        
        public function __construct ( protected UserService $userService, protected MessageService $service ) {
            //
        }
        
        public function index (): Response {
            $users = $this -> userService -> all ();
            return Inertia ::render ( 'Conversations/Index', compact ( 'users' ) );
        }
        
        public function messages ( User $user ): Response {
            $users = $this -> userService -> all ();
            $user -> setRelation ( 'messages', $user -> messages );
            return Inertia ::render ( 'Conversations/Messages', compact ( 'users', 'user' ) );
        }
        
        public function send ( MessageFormRequest $request, User $user ): JsonResponse | RedirectResponse {
            try {
                DB ::beginTransaction ();
                $message = $this -> service -> store ( $request, $user );
                DB ::commit ();

//                broadcast ( new MessageSent ( $message ) ) -> toOthers ();
                
                return response () -> json ( [ 'message' => $message ] );
            }
            catch ( \Exception | DataException $e ) {
                DB ::rollBack ();
                Log ::critical ( $e );
                return redirect () -> back () -> withErrors ( $e -> getMessage () ) -> withinput ();
            }
        }
        
        public function markMessagesRead ( User $user ): void {
            try {
                DB ::beginTransaction ();
                $this -> service -> markMessagesRead ( $user );
                DB ::commit ();
            }
            catch ( \Exception | DataException $e ) {
                DB ::rollBack ();
                Log ::critical ( $e );
            }
        }
        
    }
