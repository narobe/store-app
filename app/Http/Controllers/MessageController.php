<?php

namespace App\Http\Controllers;

use App\avail;
use App\Models\Message;
use App\Models\Product;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
  use AuthorizesRequests;

  public function index()
  {
    $user = Auth::user();
    $message = Message::where('user_id', $user->id)->latest()->get();
    return view('message.index', compact('message'));
  }


  public function store(Request $request)
  {
    $vD = $request->validate([
      'name' => 'required|string|max:255',
      'phone' => 'required',
      'message' => 'max:255',
    ]);
    $product = Product::firstWhere('i', $request->p);
    $vD['product_id'] = $product->id;
    $vD['user_id'] = $product->user->id;
    Message::create($vD);
    return redirect('product/' . $request->p);
  }


  public function update(Request $request, string $id)
  {
    return [$id];
  }

  public function destroy(string $id, Request $request)
  {
    return [$id];
    return Message::firstWhere('i', $id);
    $message->delete();
    return redirect('product/' . $request->p);
  }
}
