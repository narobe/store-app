<?php

namespace App\Http\Controllers;

use App\avail;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Expr\Cast\String_;

class ProfileController extends Controller
{
  public function index()
  {
    return view('profile.edit');
  }

  public function edit()
  {
    $user = Auth::user();
    return view('profile.edit', compact('user'));
  }

  public function update(Request $request, String $id)
  {
    $user = User::firstWhere('i', $id);

    $vD = $request->validate([
      'name' => 'required|string|max:255',
      'email' => 'required|email|max:255',
      'password' => 'required|max:8|confirmed',
      'avatar' => 'image|mimes:jpeg,png,jpg,gif|max:512',
    ]);
    $vD['password'] = Hash::make($vD['password']);
    $user->update(['avatar', '$avatar']);
    if ($request->hasFile('avatar')) {
      $old =  $user->avatar;
      $avatar = Storage::disk('public')->put('pic/avatar', $request->avatar);
      $old ? Storage::disk('public')->delete($old) : '';
      $vD['avatar'] = $avatar;
    }

    $user->update($vD);
    return redirect()->route('profile.edit');
  }
}
