<?php
    
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;
    
    return new class extends Migration {
        
        public function up (): void {
            Schema ::create ( 'conversations', function ( Blueprint $table ) {
                $table -> id ();
                $table -> foreignId ( 'created_by' );
                $table -> string ( 'name' );
                $table -> enum ( 'state', [ 'active', 'inactive' ] ) -> default ( 'active' );
                $table -> timestamps ();
                
                $table
                    -> foreign ( 'created_by' )
                    -> references ( 'id' )
                    -> on ( 'users' )
                    -> cascadeOnUpdate ()
                    -> cascadeOnDelete ();
            } );
        }
        
        public function down (): void {
            Schema ::dropIfExists ( 'conversations' );
        }
    };
