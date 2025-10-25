<?php
    
    namespace App\Observers;
    
    use App\Models\ConversationUser;
    
    class ConversationUserObserver {
        
        public function created ( ConversationUser $conversationUser ): void {
            //
        }
        
        public function updated ( ConversationUser $conversationUser ): void {
            //
        }
        
        public function deleted ( ConversationUser $conversationUser ): void {
            //
        }
        
        public function restored ( ConversationUser $conversationUser ): void {
            //
        }
        
        public function forceDeleted ( ConversationUser $conversationUser ): void {
            //
        }
    }
