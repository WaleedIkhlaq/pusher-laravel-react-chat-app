<?php
    
    namespace App\Services;
    
    use App\Models\User;
    use Illuminate\Database\Eloquent\Collection;
    use function PHPUnit\TestFixture\func;
    
    class UserService {
        
        public function all (): Collection {
            return User ::where ( 'id', '!=', auth () -> id () )
                -> whereNotIn ( 'id', function ( $query ) {
                    $query
                        -> select ( 'user_id' )
                        -> from ( 'conversation_users' )
                        -> whereIn ( 'conversation_id', function ( $query ) {
                            $query
                                -> select ( 'id' )
                                -> from ( 'conversations' )
                                -> where ( [ 'created_by' => auth () -> id () ] );
                        } );
                } )
                -> get ();
        }
        
    }
