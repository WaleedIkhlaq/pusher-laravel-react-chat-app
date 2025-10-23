<?php
    
    use App\Http\Controllers\ConversationController;
    use App\Http\Controllers\LoginController;
    use App\Http\Controllers\LogoutController;
    use App\Http\Controllers\RegisterController;
    use Illuminate\Support\Facades\Route;
    
    Route ::middleware ( [ 'web', 'guest' ] ) -> group ( function () {
        
        Route ::get ( '/', [ LoginController::class, 'index' ] )
            -> name ( 'login' );
        
        Route ::post ( '/authenticate', [ LoginController::class, 'authenticate' ] )
            -> name ( 'authenticate' );
        
        Route ::get ( 'sign-up', [ RegisterController::class, 'index' ] )
            -> name ( 'sign-up' );
        
        Route ::post ( 'sign-up', [ RegisterController::class, 'register' ] )
            -> name ( 'create-account' );
        
    } );
    
    Route ::middleware ( [ 'web', 'auth' ] ) -> group ( function () {
        
        Route ::get ( 'conversations', [ ConversationController::class, 'index' ] )
            -> name ( 'conversations' );
        
        Route ::get ( 'conversations/{user}/messages', [ ConversationController::class, 'messages' ] )
            -> name ( 'conversation.messages' );
        
        Route ::post ( 'conversations/{user}/send', [ ConversationController::class, 'send' ] )
            -> name ( 'conversation.send' );
        
        Route ::post ( 'conversations/{user}/markMessagesRead', [ ConversationController::class, 'markMessagesRead' ] )
            -> name ( 'conversation.markMessagesRead' );
        
        Route ::post ( 'logout', [ LogoutController::class, 'logout' ] )
            -> name ( 'logout' );
        
    } );
