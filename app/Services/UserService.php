<?php
    
    namespace App\Services;
    
    use App\Models\User;
    
    class UserService {
        
        public function all () {
            return User ::where ( 'id', '!=', auth () -> id () )
                -> get ()
                -> map ( function ( $user ) {
                    return [
                        'id'          => $user -> id,
                        'name'        => $user -> name,
                        'email'       => $user -> email,
                        'lastMessage' => $user -> last_message
                    ];
                } )
                -> sortByDesc ( 'lastMessage' )
                -> values ();
        }
        
    }
