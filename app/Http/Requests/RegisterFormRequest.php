<?php
    
    namespace App\Http\Requests;
    
    use Illuminate\Foundation\Http\FormRequest;
    
    class RegisterFormRequest extends FormRequest {
        
        public function authorize (): bool {
            return true;
        }
        
        public function rules (): array {
            return [
                'name'     => [ 'required', 'string', 'regex:/^\p{L}+(?:\s\p{L}+)*$/u', 'max:255' ],
                'email'    => [ 'required', 'string', 'email:rfc,dns,strict,spoof', 'max:255', 'unique:users,email' ],
                'password' => [ 'required', 'string', 'min:8', ],
            ];
        }
        
        
        public function messages (): array {
            return [
                'name.required' => 'Name is required.',
                'name.regex'    => 'Name may only contain letters separated by single spaces.',
            ];
        }
        
    }
