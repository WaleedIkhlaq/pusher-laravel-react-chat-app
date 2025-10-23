<?php
    
    namespace App\Http\Requests;
    
    use Illuminate\Foundation\Http\FormRequest;
    
    class LoginFormRequest extends FormRequest {
        
        public function authorize (): bool {
            return true;
        }
        
        public function rules (): array {
            return [
                'email'    => [ 'required', 'email', 'max:255', 'exists:users,email' ],
                'password' => [ 'required', 'string', 'min:8' ],
            ];
        }
        
        public function messages (): array {
            return [
                'email.email'  => 'Invalid email address.',
                'email.exists' => 'Email address not found.',
            ];
        }
        
    }
