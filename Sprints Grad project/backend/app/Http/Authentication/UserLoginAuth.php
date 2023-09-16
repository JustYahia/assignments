<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserLoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string',
        ];
    }

    /**
     * Attempt user login and return the result.
     *
     * @return array
     */
    public function userLogin(): array
    {
        $credentials = $this->only('email', 'password');

        try {
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;

                return [
                    'success' => true,
                    'message' => 'User logged in successfully',
                    'data' => [
                        'user' => $user,
                        'token' => $token,
                    ],
                ];
            } else {
                throw new \Exception('Invalid credentials');
            }
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
            ];
        }
    }
}
