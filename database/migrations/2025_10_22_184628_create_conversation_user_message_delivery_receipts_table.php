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
                $table -> foreignId ( 'message_id' );
                $table -> enum ( 'status', [ 'delivered', 'read' ] ) -> default ( 'delivered' );
                $table -> timestamps ();
                
                $table
                    -> foreign ( 'conversation_id', 'c' )
                    -> references ( 'id' )
                    -> on ( 'conversations' )
                    -> cascadeOnUpdate ()
                    -> cascadeOnDelete ();
                
                $table
                    -> foreign ( 'user_id', 'cu' )
                    -> references ( 'id' )
                    -> on ( 'users' )
                    -> cascadeOnUpdate ()
                    -> cascadeOnDelete ();
                
                $table
                    -> foreign ( 'message_id', 'cum' )
                    -> references ( 'id' )
                    -> on ( 'conversation_user_messages' )
                    -> cascadeOnUpdate ()
                    -> cascadeOnDelete ();
            } );
        }
        
        public function down (): void {
            Schema ::dropIfExists ( 'conversation_user_message_delivery_receipts' );
        }
    };
