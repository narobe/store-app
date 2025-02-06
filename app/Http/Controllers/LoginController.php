<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class LoginController extends Controller
{
    public static function index()
    {
        return view('auth.login');
    }

    public static function authenticate(Request $request)
    {
        $c = $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required',
        ]);

        if (Auth::attempt($c)) {
            $request->session()->regenerateToken();
            return redirect()->intended(route('dashboard'));
        } else {
            return back()->withErrors([
                'login' => 'Incorrect credientials'
            ]);
        }
    }

    public static function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
