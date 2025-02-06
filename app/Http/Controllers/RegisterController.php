<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class RegisterController extends Controller
{

  public static function index()
  {
    return view('auth.register');
  }

  public static function store(Request $request)
  {
    $vD = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|email|max:255|unique:users,email',
      'password' => 'required|max:8|confirmed',
      'avatar' => 'image|mimes:jpeg,png,jpg,gif|max:512',
    ]);

    if ($request->hasFile('avatar')) {
      $vD['avatar'] = Storage::disk('public')->put('pic/avatar', $request->avatar);
    }
    $vD['password'] = Hash::make($vD['password']);
    User::create($vD);
    return redirect()->route('login');
  }
}
