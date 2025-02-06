<?php

namespace App;

use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class avail
{
  /**
   * Create a new class instance.
   */
  public function __construct()
  {
    //
  }

  public static function avatar_url(User $user = null): String
  {
    if ($user) {
      if (!$user->avatar) return asset('storage/pic/avatar/placeholder.svg');
      return asset('storage/' . $user->avatar);
    } else {
      if (!Auth::user()->avatar) return asset('storage/pic/avatar/placeholder.svg');
      return asset('storage/' . Auth::user()->avatar);
    }
  }

  public static function store_logo($i): String
  {
    $store = Store::firstWhere('i', $i);
    if (!$store->logo) return asset('storage/pic/logo/placeholder.svg');
    return asset('storage/' . $store->logo);
  }

  public static function product_pic($i): String
  {
    $product = Product::firstWhere('i', $i);
    if (!isset($product->picture) || !$product->picture) return asset('storage/pic/picture/placeholder.svg');
    return asset('storage/' . $product->picture);
  }

  public static function p_v_c($product, Request $request)
  {
    $store = $product->store;
    $ip = $request->ip();
    $visit = DB::table('store_visit')->where(
      [
        ['ip', '=', $ip],
        // ['store_id', '=', $store->id],
        ['product_id', '=', $product->id]
      ]
    )->first();

    $visit ?? DB::table('store_visit')->insert(
      [
        'ip' => $ip,
        // 'store_id' => $store->id,
        'product_id' => $product->id,
        'created_at' => now()
      ]
    );
  }

  public static function s_v_c($store, Request $request)
  {
    $ip = $request->ip();
    $visit = DB::table('store_visit')->where([
      ['ip', '=', $ip],
      ['store_id', '=', $store->id]
    ])->first();


    $visit ?? DB::table('store_visit')->insert(
      [
        'ip' => $ip,
        'store_id' => $store->id,
        'created_at' => now()
      ]
    );
  }

  public static function a_s_v_c($store): int
  {
    if ($store == 'all') {
      $stores = Auth::user()->store;
      $vc = [];
      foreach ($stores as $s) {
        $visit = DB::table('store_visit')->where('store_id', $s->id)->count();
        array_push($vc, $visit);
      }
      $vc = array_sum($vc);
      return  $vc;
    }
    $vc = [];
    $visit = DB::table('store_visit')->where('store_id', $store->id)->count();
    array_push($vc, $visit);
    $vc = array_sum($vc);
    return  $vc;
  }

  public static function a_p_v_c($product): int
  {

    if ($product == 'all') {
      $products = Auth::user()->product;
      $vc = [];
      foreach ($products as $p) {
        $visit = DB::table('store_visit')->where('product_id', $p->id)->count();
        array_push($vc, $visit);
      }
      $vc = array_sum($vc);
      return  $vc;
    }
    $vc = [];
    $visit = DB::table('store_visit')->where('product_id', $product->id)->count();
    array_push($vc, $visit);
    $vc = array_sum($vc);
    return  $vc;
  }

  public static function all_cats()
  {
    return ['clothing', 'cosmetics', 'electronics', 'food & drink', 'gadgets'];
  }
}
