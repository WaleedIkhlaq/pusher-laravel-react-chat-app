<?php
    
    namespace App\Services;
    
    use App\Models\Conversation;
    use Illuminate\Support\Facades\DB;
    
    class ConversationService {
        
        public function conversations () {
            return Conversation ::whereIn ( 'id', function ( $query ) {
                $query
                    -> select ( 'conversation_id' )
                    -> from ( 'conversation_users' )
                    -> where ( [ 'user_id' => auth () -> id () ] );
            } )
                -> with ( [ 'lastMessage', 'user' ] )
                -> withMax ( 'messages', 'created_at' )
                -> orderByDesc ( DB ::raw ( 'COALESCE(messages_max_created_at, chat_conversations.created_at)' ) )
                -> get ();
        }
        
        public function store ( $user ) {
            return Conversation ::create ( [
                                               'created_by'    => auth () -> id (),
                                               'friendly_name' => $user -> name,
                                               'state'         => 'active'
                                           ] );
        }
        
    }
