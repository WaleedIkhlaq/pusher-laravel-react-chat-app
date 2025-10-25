<?php
    
    use Illuminate\Support\Facades\Broadcast;
    use App\Models\User;
    use App\Models\ConversationUser;
    
    Broadcast ::channel ( 'user.{id}', function ( User $user, int $id ) {
        return $user -> id === $id;
    } );
    
    Broadcast ::channel ( 'conversation.{id}', function ( User $user, int $id ) {
        return ConversationUser ::where ( [ 'user_id' => $user -> id, 'conversation_id' => $id ] ) -> exists ();
    } );
    
    Broadcast ::channel ( 'online', function ( User $user ) {
        return $user;
    } );
