<?php
    
    namespace App\Http\Controllers;
    
    use App\Http\Requests\ConversationFormRequest;
    use App\Models\Conversation;
    use App\Models\User;
    use App\Services\ConversationService;
    use App\Services\ConversationUserMessageDeliveryReceiptService;
    use App\Services\ConversationUserMessageService;
    use App\Services\ConversationUserService;
    use App\Services\UserService;
    use Dflydev\DotAccessData\Exception\DataException;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Log;
    use Inertia\Inertia;
    use Inertia\Response;
    
    class ConversationController extends Controller {
        
        public function __construct (
            protected UserService                                   $userService,
            protected ConversationService                           $service,
            protected ConversationUserService                       $conversationUserService,
            protected ConversationUserMessageService                $conversationUserMessageService,
            protected ConversationUserMessageDeliveryReceiptService $conversationUserMessageDeliveryReceiptService,
        ) {
            //
        }
        
        public function index (): Response {
            $users         = $this -> userService -> all ();
            $conversations = $this -> service -> conversations ();
            return Inertia ::render ( 'Conversations/Index', compact ( 'users', 'conversations' ) );
        }
        
        public function create ( ConversationFormRequest $request, User $user ): JsonResponse {
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
                return response () -> json ( [ 'error' => $e -> getMessage () ], 500 );
            }
        }
        
        public function messages ( Conversation $conversation ): JsonResponse {
            $conversation -> load ( 'messages.user' );
            try {
                DB ::beginTransaction ();
                $this -> conversationUserMessageDeliveryReceiptService -> mark_read ( $conversation -> messages );
                DB ::commit ();
                
                return response () -> json ( $conversation );
            }
            catch ( \Exception | DataException $e ) {
                DB ::rollBack ();
                Log ::critical ( $e );
                return response () -> json ( [ 'error' => $e -> getMessage () ], 500 );
            }
        }
        
        public function send_message ( Request $request, Conversation $conversation ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $message = $this -> conversationUserMessageService -> store ( $request, $conversation );
                DB ::commit ();
                
                return response () -> json ( [ 'message' => $message ] );
            }
            catch ( \Exception | DataException $e ) {
                DB ::rollBack ();
                Log ::critical ( $e );
                return response () -> json ( [ 'error' => $e -> getMessage () ], 500 );
            }
        }
        
        public function send_files ( Request $request, Conversation $conversation ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $message = $this -> conversationUserMessageService -> send_files ( $request, $conversation );
                DB ::commit ();
                
                return response () -> json ( [ 'message' => $message ] );
            }
            catch ( \Exception | DataException $e ) {
                DB ::rollBack ();
                Log ::critical ( $e );
                return response () -> json ( [ 'error' => $e -> getMessage () ], 500 );
            }
        }
        
    }
