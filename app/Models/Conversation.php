<?php
    
    namespace App\Models;
    
    use App\Observers\ConversationObserver;
    use Illuminate\Database\Eloquent\Attributes\ObservedBy;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;
    use Illuminate\Database\Eloquent\Relations\HasMany;
    use Illuminate\Database\Eloquent\Relations\HasOne;
    
    #[ObservedBy( ConversationObserver::class )]
    class Conversation extends Model {
        
        public function user (): BelongsTo {
            return $this -> belongsTo ( User::class, 'created_by' );
        }
        
        public function participants (): HasMany {
            return $this -> hasMany ( ConversationUser::class );
        }
        
        public function other_participant (): HasOne {
            return $this
                -> hasOne ( ConversationUser::class )
                -> where ( 'user_id', '!=', auth () -> id () );
        }
        
        public function messages (): HasMany {
            return $this -> hasMany ( ConversationUserMessage::class );
        }
        
        public function lastMessage (): HasOne {
            return $this -> hasOne ( ConversationUserMessage::class ) -> latestOfMany ();
        }
        
    }
