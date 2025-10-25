<?php
    
    namespace App\Events;
    
    use Illuminate\Broadcasting\Channel;
    use Illuminate\Broadcasting\InteractsWithSockets;
    use Illuminate\Broadcasting\PresenceChannel;
    use Illuminate\Broadcasting\PrivateChannel;
    use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
    use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
    use Illuminate\Contracts\Broadcasting\ShouldRescue;
    use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
    use Illuminate\Foundation\Events\Dispatchable;
    use Illuminate\Queue\SerializesModels;
    
    class ConversationCreated implements ShouldBroadcastNow, ShouldDispatchAfterCommit, ShouldRescue {
        use Dispatchable, InteractsWithSockets, SerializesModels;
        
        public function __construct ( public $conversation ) {
            $this -> conversation -> load ( 'user' );
        }
        
        public function broadcastOn (): array {
            return [
                ...$this -> conversation -> participants -> map (
                    fn ( $participant ) => new PrivateChannel( 'user.' . $participant -> user_id )
                ) -> toArray (),
            ];
        }
    }
