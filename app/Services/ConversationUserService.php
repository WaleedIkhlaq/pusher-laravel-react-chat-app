<?php
    
    namespace App\Services;
    
    use App\Models\ConversationUser;
    
    class ConversationUserService {
        
        public function add_participants ( $conversation, $user ) {
            return ConversationUser ::create ( [
                                            'conversation_id' => $conversation -> id,
                                            'user_id'         => $user -> id
                                        ] );
        }
        
    }
