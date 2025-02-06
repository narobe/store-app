<?php

namespace App\Http\Controllers;

use App\avail;
use App\Models\Message;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{


  public static function index()
  {

    $user = Auth::user();

    $store = Store::where('user_id', $user->id)->latest()->get();

    $product = Product::where('user_id', $user->id)->latest()->limit(24)->get();

    $vc = avail::a_s_v_c('all');

    $message = Message::where('user_id', $user->id)->latest()->limit(4)->get();
    return view('dashboard.index', compact('user', 'message', 'store', 'product'));
  }
}
