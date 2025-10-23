<?php
    
    namespace App\Http\Requests;
    
    use Illuminate\Foundation\Http\FormRequest;
    
    class MessageFormRequest extends FormRequest {
        
        public function authorize (): bool {
            return true;
        }
        
        public function rules (): array {
            return [
                'message' => [ 'required', 'string', 'min:1' ],
            ];
        }
    }
