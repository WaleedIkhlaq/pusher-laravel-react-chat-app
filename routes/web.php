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
        
        Route ::resource ( 'conversations', ConversationController::class );
        
        Route ::post ( 'logout', [ LogoutController::class, 'logout' ] )
            -> name ( 'logout' );
        
    } );
