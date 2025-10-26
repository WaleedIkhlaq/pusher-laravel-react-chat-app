<?php
    
    namespace App\Models;
    
    use App\Observers\ConversationUserMessageObserver;
    use Illuminate\Database\Eloquent\Attributes\ObservedBy;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;
    use Illuminate\Database\Eloquent\Relations\HasMany;
    
    #[ObservedBy( ConversationUserMessageObserver::class )]
    class ConversationUserMessage extends Model {
        
        public function conversation (): BelongsTo {
            return $this -> belongsTo ( Conversation::class );
        }
        
        public function user (): BelongsTo {
            return $this -> belongsTo ( User::class );
        }
        
        public function delivery_receipts (): HasMany {
            return $this -> hasMany ( ConversationUserMessageDeliveryReceipt::class );
        }
        
    }
