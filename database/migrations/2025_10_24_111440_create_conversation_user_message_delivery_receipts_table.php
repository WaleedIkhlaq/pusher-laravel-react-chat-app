<?php
    
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    
    return new class extends Migration {
        
        public function up (): void {
            Schema ::create ( 'conversation_user_message_delivery_receipts', function ( Blueprint $table ) {
                $table -> id ();
                $table -> foreignId ( 'conversation_id' );
                $table -> foreignId ( 'user_id' );
                $table -> foreignId ( 'conversation_user_messages_id' );
                $table -> enum ( 'state', [ 'delivered', 'read' ] ) -> default ( 'delivered' );
                $table -> timestamps ();
                
                $table
                    -> foreign ( 'conversation_id', 'receipt_conversation_id' )
                    -> references ( 'id' )
                    -> on ( 'conversations' )
                    -> cascadeOnDelete ()
                    -> cascadeOnUpdate ();
                
                $table
                    -> foreign ( 'user_id', 'receipt_user_id' )
                    -> references ( 'id' )
                    -> on ( 'users' )
                    -> cascadeOnDelete ()
                    -> cascadeOnUpdate ();
                
                $table
                    -> foreign ( 'conversation_user_messages_id', 'receipt_message_id' )
                    -> references ( 'id' )
                    -> on ( 'conversation_user_messages' )
                    -> cascadeOnDelete ()
                    -> cascadeOnUpdate ();
            } );
        }
        
        public function down (): void {
            Schema ::dropIfExists ( 'conversation_user_message_delivery_receipts' );
        }
    };
