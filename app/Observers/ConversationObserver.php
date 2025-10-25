<?php
    
    namespace App\Observers;
    
    use App\Events\ConversationCreated;
    use App\Models\Conversation;
    
    class ConversationObserver {
        
        public function created ( Conversation $conversation ): void {
            $conversation
                -> participants ()
                -> create ( [
                                'conversation_id' => $conversation -> id,
                                'user_id'         => auth () -> id (),
                            ] );
            
            ConversationCreated ::dispatch ( $conversation );
        }
        
        public function updated ( Conversation $conversation ): void {
            //
        }
        
        public function deleted ( Conversation $conversation ): void {
            //
        }
        
        public function restored ( Conversation $conversation ): void {
            //
        }
        
        public function forceDeleted ( Conversation $conversation ): void {
            //
        }
    }
