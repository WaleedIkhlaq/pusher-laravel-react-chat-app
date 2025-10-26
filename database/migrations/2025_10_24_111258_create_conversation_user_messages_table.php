<?php
    
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    
    return new class extends Migration {
        
        public function up (): void {
            Schema ::create ( 'conversation_user_messages', function ( Blueprint $table ) {
                $table -> id ();
                $table -> foreignId ( 'conversation_id' );
                $table -> foreignId ( 'user_id' );
                $table -> text ( 'message' ) -> nullable ();
                $table -> json ( 'media' ) -> nullable ();
                $table -> json ( 'attributes' ) -> nullable ();
                $table -> timestamps ();
                
                $table
                    -> foreign ( 'conversation_id', 'messages_conversation_id' )
                    -> references ( 'id' )
                    -> on ( 'conversations' )
                    -> cascadeOnDelete ()
                    -> cascadeOnUpdate ();
                
                $table
                    -> foreign ( 'user_id', 'messages_user_id' )
                    -> references ( 'id' )
                    -> on ( 'users' )
                    -> cascadeOnDelete ()
                    -> cascadeOnUpdate ();
            } );
        }
        
        public function down (): void {
            Schema ::dropIfExists ( 'conversation_user_messages' );
        }
    };
