<?php
    
    namespace App\Http\Controllers;
    
    use App\Http\Controllers\Controller;
    use App\Services\ConversationService;
    use App\Services\UserService;
    use Illuminate\Http\Request;
    use Inertia\Inertia;
    use Inertia\Response;
    
    class ConversationController extends Controller {
        
        public function __construct ( protected ConversationService $service, protected UserService $userService ) {
            //
        }
        
        public function index (): Response {
            $users = $this -> userService -> all ();
            return Inertia ::render ( 'Conversations/Index', compact ( 'users' ) );
        }
        
        public function store ( Request $request ) {
            //
        }
        
        public function edit ( string $id ) {
            //
        }
        
        public function update ( Request $request, string $id ) {
            //
        }
        
        public function destroy ( string $id ) {
            //
        }
    }
