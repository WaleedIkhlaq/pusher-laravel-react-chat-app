<?php
    
    namespace App\Services;
    
    use App\Models\User;
    use Illuminate\Database\Eloquent\Collection;
    
    class UserService {
        
        public function all (): Collection {
            return User ::where ( 'id', '!=', auth () -> id () ) -> get ();
        }
        
    }
