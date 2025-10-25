<?php
    
    namespace App\Services;
    
    use App\Models\Conversation;
    use App\Models\ConversationUser;
    
    class ConversationService {
        
        public function  conversations () {
            return Conversation ::whereIn ( 'id', function ( $query ) {
                $query
                    -> select ( 'conversation_id' )
                    -> from ( 'conversation_users' )
                    -> where ( [ 'user_id' => auth () -> id () ] );
            } )
                -> with ( [ 'lastMessage', 'user' ] )
                -> latest ()
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
