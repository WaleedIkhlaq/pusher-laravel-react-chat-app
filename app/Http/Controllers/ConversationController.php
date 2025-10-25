<?php
    
    namespace App\Http\Controllers;
    
    use App\Http\Requests\ConversationFormRequest;
    use App\Models\User;
    use App\Services\ConversationService;
    use App\Services\ConversationUserService;
    use App\Services\UserService;
    use Dflydev\DotAccessData\Exception\DataException;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\RedirectResponse;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Log;
    use Inertia\Inertia;
    use Inertia\Response;
    
    class ConversationController extends Controller {
        
        public function __construct (
            protected UserService             $userService,
            protected ConversationService     $service,
            protected ConversationUserService $conversationUserService
        ) {
            //
        }
        
        public function index (): Response {
            $users         = $this -> userService -> all ();
            $conversations = $this -> service -> conversations ();
            return Inertia ::render ( 'Conversations/Index', compact ( 'users', 'conversations' ) );
        }
        
        public function create ( ConversationFormRequest $request, User $user ): JsonResponse | RedirectResponse {
            try {
                DB ::beginTransaction ();
                $conversation = $this -> service -> store ( $user );
                $this -> conversationUserService -> add_participants ( $conversation, $user );
                DB ::commit ();
                
                return response () -> json ( [ 'conversation' => $conversation ] );
            }
            catch ( \Exception | DataException $e ) {
                DB ::rollBack ();
                Log ::critical ( $e );
                return redirect () -> back () -> withErrors ( $e -> getMessage () ) -> withinput ();
            }
        }

//        public function send ( Request $request, User $user ): JsonResponse | RedirectResponse {
//            try {
//                DB ::beginTransaction ();
//                $message = $this -> service -> store ( $request, $user );
//                DB ::commit ();
//
//                $message -> load ( [ 'sender', 'receiver' ] );
//                MessageSent ::dispatch ( $message );
//
//                return response () -> json ( [ 'message' => $message ] );
//            }
//            catch ( \Exception | DataException $e ) {
//                DB ::rollBack ();
//                Log ::critical ( $e );
//                return redirect () -> back () -> withErrors ( $e -> getMessage () ) -> withinput ();
//            }
//        }
    
    }
