<?php
    
    namespace App\Observers;
    
    use App\Events\ConversationUpdated;
    use App\Events\MessageSent;
    use App\Models\ConversationUserMessage;
    
    class ConversationUserMessageObserver {
        
        public function created ( ConversationUserMessage $message ): void {
            $message -> load ( 'conversation' );
            MessageSent ::dispatch ( $message );
            ConversationUpdated ::dispatch ( $message -> conversation );
        }
        
        public function updated ( ConversationUserMessage $message ): void {
            //
        }
        
        public function deleted ( ConversationUserMessage $message ): void {
            //
        }
        
        public function restored ( ConversationUserMessage $message ): void {
            //
        }
        
        public function forceDeleted ( ConversationUserMessage $message ): void {
            //
        }
    }
