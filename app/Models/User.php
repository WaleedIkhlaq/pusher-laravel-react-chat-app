<?php
    
    namespace App\Models;
    
    // use Illuminate\Contracts\Auth\MustVerifyEmail;
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Relations\HasMany;
    use Illuminate\Foundation\Auth\User as Authenticatable;
    use Illuminate\Notifications\Notifiable;
    
    class User extends Authenticatable {
        
        use HasFactory, Notifiable;
        
        protected $fillable = [
            'name',
            'email',
            'password',
        ];
        
        protected $hidden = [
            'password',
            'remember_token',
        ];
        
        protected function casts (): array {
            return [
                'email_verified_at' => 'datetime',
                'password'          => 'hashed',
            ];
        }
        
        public function getMessagesAttribute () {
            $user_id = auth () -> id ();
            return Message ::where ( function ( $query ) use ( $user_id ) {
                $query -> where ( 'sender_id', $user_id )
                    -> where ( 'receiver_id', $this -> id );
            } )
                -> orWhere ( function ( $query ) use ( $user_id ) {
                    $query -> where ( 'sender_id', $this -> id )
                        -> where ( 'receiver_id', $user_id );
                } )
                -> with ( [ 'sender', 'receiver' ] )
                -> get ();
        }
        
        public function getLastMessageAttribute () {
            $user_id = auth () -> id ();
            return Message ::where ( function ( $query ) use ( $user_id ) {
                $query -> where ( 'sender_id', $user_id )
                    -> where ( 'receiver_id', $this -> id );
            } )
                -> orWhere ( function ( $query ) use ( $user_id ) {
                    $query -> where ( 'sender_id', $this -> id )
                        -> where ( 'receiver_id', $user_id );
                } )
                -> orderByDesc ( 'id' )
                -> first ();
        }
    }
