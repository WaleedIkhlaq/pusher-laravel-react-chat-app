<?php
    
    use Illuminate\Support\Facades\Broadcast;
    use App\Models\User;
    
    Broadcast ::channel ( 'chat.{id}', function ( User $user, int $id ) {
        return $user -> id === $id;
    } );
    
    Broadcast ::channel ( 'online', function ( \App\Models\User $user ) {
        return $user;
    } );
