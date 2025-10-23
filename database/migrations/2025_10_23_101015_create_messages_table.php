<?php
    
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    
    return new class extends Migration {
        
        public function up (): void {
            Schema ::create ( 'messages', function ( Blueprint $table ) {
                $table -> id ();
                $table -> foreignId ( 'sender_id' );
                $table -> foreignId ( 'receiver_id' );
                $table -> text ( 'message' );
                $table -> json ( 'attributes' ) -> nullable ();
                $table -> dateTime ( 'read_at' ) -> nullable ();
                $table -> timestamps ();
                
                $table
                    -> foreign ( 'sender_id' )
                    -> references ( 'id' )
                    -> on ( 'users' )
                    -> cascadeOnUpdate ()
                    -> cascadeOnDelete ();
                
                $table
                    -> foreign ( 'receiver_id' )
                    -> references ( 'id' )
                    -> on ( 'users' )
                    -> cascadeOnUpdate ()
                    -> cascadeOnDelete ();
            } );
        }
        
        public function down (): void {
            Schema ::dropIfExists ( 'messages' );
        }
    };
