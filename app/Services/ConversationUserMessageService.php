<?php
    
    namespace App\Services;
    
    use App\Helpers\GeneralHelper;
    use App\Models\ConversationUserMessage;
    
    class ConversationUserMessageService {
        
        public function store ( $request, $conversation ) {
            return ConversationUserMessage :: create ( [
                                                           'conversation_id' => $conversation -> id,
                                                           'user_id'         => auth () -> id (),
                                                           'message'         => $request -> input ( 'message' )
                                                       ] );
        }
        
        public function send_files ( $request, $conversation ) {
            $files = ( new GeneralHelper() )
                -> upload ( $request, './uploads/conversations/' );
            
            return ConversationUserMessage :: create ( [
                                                           'conversation_id' => $conversation -> id,
                                                           'user_id'         => auth () -> id (),
                                                           'media'           => json_encode ( $files )
                                                       ] );
        }
        
    }
