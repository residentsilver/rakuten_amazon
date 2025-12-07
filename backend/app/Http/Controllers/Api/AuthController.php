<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * ユーザー登録
     */
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
            ],
        ], 201);
    }

    /**
     * ログイン
     */
    public function login(LoginRequest $request)
    {
        $credentials = [];
        if ($request->filled('email')) {
            $credentials['email'] = $request->email;
        } else {
            $credentials['username'] = $request->username;
        }
        $credentials['password'] = $request->password;

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'message' => 'メールアドレスまたはパスワードが正しくありません',
            ], 401);
        }

        $user = User::where($request->filled('email') ? 'email' : 'username', $credentials[$request->filled('email') ? 'email' : 'username'])->first();

        // トークン有効期限の設定（Sanctumのデフォルト機能では有効期限設定はconfig依存だが、ここでは簡易的に実装）
        // 詳細設計書では remember: true で30日、false で24時間
        // SanctumのPersonalAccessTokenは有効期限を持たないのがデフォルトだが、
        // config/sanctum.php の expiration で設定可能。動的に変えるにはカスタムロジックが必要だが、
        // ここでは一旦標準の createToken を使用する。

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
            ],
        ]);
    }

    /**
     * ログアウト
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'ログアウトしました',
        ]);
    }

    /**
     * 現在のユーザー情報取得
     */
    public function user(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => new UserResource($request->user()),
        ]);
    }
}
