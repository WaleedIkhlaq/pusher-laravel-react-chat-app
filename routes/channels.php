<?php
    
    use Illuminate\Support\Facades\Broadcast;
    use App\Models\User;
    
    Broadcast ::channel ( 'user.{id}', function ( User $user, int $id ) {
        return $user -> id === $id;
    } );
    
    Broadcast ::channel ( 'online', function ( User $user ) {
        return $user;
    } );
