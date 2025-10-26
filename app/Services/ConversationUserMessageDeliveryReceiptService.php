<?php
    
    namespace App\Services;
    
    class ConversationUserMessageDeliveryReceiptService {
        
        public function mark_read ( $messages ): void {
            if ( count ( $messages ) > 0 ) {
                foreach ( $messages as $message ) {
                    $message
                        -> delivery_receipts ()
                        -> where ( [
                                       'conversation_id'              => $message -> conversation_id,
                                       'user_id'                      => auth () -> id (),
                                       'conversation_user_message_id' => $message -> id,
                                       'state'                        => 'delivered'
                                   ] )
                        -> update ( [ 'state' => 'read' ] );
                }
            }
        }
        
    }
