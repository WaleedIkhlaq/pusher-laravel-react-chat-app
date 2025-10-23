<?php
    
    namespace App\Services;
    
    use App\Models\Message;
    
    class MessageService {
        
        public function store ( $request, $user ) {
            return Message ::create ( [
                                          'sender_id'   => auth () -> id (),
                                          'receiver_id' => $user -> id,
                                          'message'     => $request -> validated ( 'message' ),
                                      ] );
        }
        
        public function markMessagesRead ( $user ): void {
            Message ::where ( [ 'sender_id' => $user -> id, 'receiver_id' => auth () -> id () ] )
                -> update ( [
                                'read_at' => now ()
                            ] );
        }
        
    }
