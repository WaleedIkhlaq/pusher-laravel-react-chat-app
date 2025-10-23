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
    
    class MessageSent implements ShouldBroadcastNow, ShouldDispatchAfterCommit, ShouldRescue {
        use Dispatchable, InteractsWithSockets, SerializesModels;
        
        public function __construct ( public $message ) {
            //
        }
        
        public function broadcastOn (): array {
            return [
                new PrivateChannel( 'chat.' . $this -> message -> sender_id ),
                new PrivateChannel( 'chat.' . $this -> message -> receiver_id ),
                new PresenceChannel( 'online' ),
            ];
        }
    }
