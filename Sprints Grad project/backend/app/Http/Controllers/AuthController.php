<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\AdminLoginRequest;
use App\Http\Requests\Auth\UserLoginRequest;
use App\Http\Requests\Auth\UserRegisterRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function userRegister(UserRegisterRequest $request)
    {
        $user = $request->userRegister();

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => $user,
        ], 201);
    }

    public function userLogin(UserLoginRequest $request)
    {
        $auth = $request->userLogin();

        return response()->json([
            'success' => true,
            'message' => 'User logged in successfully',
            'data' => $auth,
        ], 200);
    }

    

    public function logout(Request $request)
    {
        // Revoke the current access token to log the user out
        $request->user()->currentAccessToken()->delete();

        return response([
            'message' => 'You have been successfully logged out.',
        ], 200);
    }
}
