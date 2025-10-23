<?php
    
    namespace App\Services;
    
    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    
    class RegisterService {
        
        public function store ( $request ) {
            return User ::create ( [
                                       'name'     => $request -> validated ( 'name' ),
                                       'email'    => $request -> validated ( 'email' ),
                                       'password' => Hash ::make ( $request -> validated ( 'password' ) ),
                                   ] );
        }
        
    }
