<?php
    
    namespace App\Models;
    
    use Illuminate\Database\Eloquent\Casts\Attribute;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;
    
    class Message extends Model {
        
        protected $guarded = [];
        
        public function createdAt (): Attribute {
            return Attribute ::make (
                get: fn ( string $value ) => date ( 'g:i A', strtotime ( $value ) )
            );
        }
        
        public function sender (): BelongsTo {
            return $this -> belongsTo ( User::class, 'sender_id' );
        }
        
        public function receiver (): BelongsTo {
            return $this -> belongsTo ( User::class, 'receiver_id' );
        }
        
    }
