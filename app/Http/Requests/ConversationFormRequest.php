<?php
    
    namespace App\Http\Requests;
    
    use App\Models\Conversation;
    use Illuminate\Foundation\Http\FormRequest;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Validation\Validator;
    
    class ConversationFormRequest extends FormRequest {
        
        public function authorize (): bool {
            return Auth ::check ();
        }
        
        public function rules (): array {
            return [
                'user' => [ 'required', 'integer', 'exists:users,id' ],
            ];
        }
        
        public function after (): array {
            return [
                function ( Validator $validator ) {
                    $auth           = $this -> user ();
                    $participant_id = $this -> input ( 'user' );
                    
                    $exists = Conversation ::where ( 'created_by', $auth -> id )
                        -> whereHas ( 'participants', function ( $query ) use ( $participant_id ) {
                            $query -> where ( 'user_id', $participant_id );
                        } )
                        -> exists ();
                    
                    if ( $exists ) {
                        $validator -> errors () -> add (
                            'conversation',
                            'A conversation with this user already exists.'
                        );
                    }
                }
            ];
        }
    }
