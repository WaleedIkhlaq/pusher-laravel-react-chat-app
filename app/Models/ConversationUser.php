<?php
    
    namespace App\Models;
    
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;
    
    class ConversationUser extends Model {
        
        public function conversation (): BelongsTo {
            return $this -> belongsTo ( Conversation::class );
        }
        
    }
