<?php
    
    namespace App\Services;
    
    use App\Models\ConversationUserMessage;
    
    class ConversationUserMessageService {
        
        public function store ( $request, $conversation ) {
            return ConversationUserMessage :: create ( [
                                                           'conversation_id' => $conversation -> id,
                                                           'user_id'         => auth () -> id (),
                                                           'message'         => $request -> input ( 'message' )
                                                       ] );
        }
        
    }
