<?php
    
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    
    return new class extends Migration {
        
        public function up (): void {
            Schema ::create ( 'conversations', function ( Blueprint $table ) {
                $table -> id ();
                $table -> foreignId ( 'created_by' );
                $table -> string ( 'friendly_name' ) -> nullable ();
                $table -> enum ( 'state', [ 'active', 'inactive' ] ) -> default ( 'active' );
                $table -> json ( 'attributes' ) -> nullable ();
                $table -> timestamps ();
                
                $table
                    -> foreign ( 'created_by' )
                    -> references ( 'id' )
                    -> on ( 'users' )
                    -> cascadeOnDelete ()
                    -> cascadeOnUpdate ();
            } );
        }
        
        public function down (): void {
            Schema ::dropIfExists ( 'conversations' );
        }
    };
