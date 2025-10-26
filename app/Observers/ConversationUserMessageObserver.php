<?php
    
    namespace App\Observers;
    
    use App\Events\ConversationUpdated;
    use App\Events\MessageSent;
    use App\Models\ConversationUserMessage;
    
    class ConversationUserMessageObserver {
        
        public function created ( ConversationUserMessage $message ): void {
            $message -> load ( 'conversation.participants', 'delivery_receipts' );
            
            $participants = $message -> conversation -> participants ?? [];
            
            foreach ( $participants as $participant ) {
                $isSender = $participant -> id === auth () -> id ();
                
                $message
                    -> delivery_receipts ()
                    -> create ( [
                                    'conversation_id'              => $message -> conversation_id,
                                    'user_id'                      => $participant -> id,
                                    'conversation_user_message_id' => $message -> id,
                                    'state'                        => $isSender ? 'read' : 'delivered'
                                ] );
            }
            
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
