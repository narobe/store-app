<?php

namespace App\Http\Controllers;

use App\avail;
use App\Models\Message;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
  use AuthorizesRequests;



  public function index()
  {
    if (!Auth::check()) {
      $product = DB::table('products')->latest()->get();
      return view('product.index', compact('product'));
    }

    $product = Auth::user()->product;
    return view('product.index', compact('product'));
  }

  public function filter(Request $request)
  {
    if ($request->f) {
      $product = DB::table('products')->where('category', $request->f)->get();
      return view('product.index', compact('product'));
    }

    $keyword = null;
    $price = null;
    // price operator 
    $po = '<=';
    $asdc = 'asc';

    $request->order == 'max' ?
      $po = '<='
      :      $po = '>=';
    $request->order == 'max' ?
      $asdc = 'desc'
      :      $asdc = 'asc';

    if ($request->k) {
      $keyword = $request->k;
    }
    if ($request->p) {
      $price = $request->p;
    }
    $product = DB::table('products')->where(function ($query) use ($keyword, $price, $po) {
      $price && $keyword ?
        $query->where('name', 'like', '%' . $keyword . '%')
        ->where('price', $po, $price) : '';
      $price ?
        $query->where('price', $po, $price) : '';
      $keyword ?
        $query->where('name', 'like', '%' . $keyword . '%') : '';
    })->orderBy('price', $asdc)->get();

    return view('product.index', compact('product'));
  }


  public function create(Request $request)
  {
    $s = $request->s;
    return view('product.create')->with('store', $s);
  }


  public function store(Request $request)
  {
    if (!$request->s) return;

    $vD = $request->validate([
      'name' => 'required|string|max:255',
      'price' => 'required',
      'picture' => 'image|mimes:jpeg,png,jpg,gif|max:512',
    ]);

    if ($request->hasFile('picture')) {
      $vD['picture'] = Storage::disk('public')->put('pic/picture', $request->picture);
    }

    $store = Store::firstWhere('i', $request->s);
    $vD['store_id'] = $store->id;
    $vD['user_id'] = $store->user;
    Product::create($vD);
    return redirect('store/' . $request->s);
  }


  public function show(string $id, Request $request)
  {
    $product = Product::firstWhere('i', $id);
    avail::s_v_c($product->store, $request);
    avail::p_v_c($product, $request);
    $message = Message::where('product_id', $product->id)->latest()->get();
    if (!Auth::check()) {
      return view('product.show')->with(['product' => $product, 'message' => $message]);
    }

    return view('product.show')->with(['product' => $product, 'message' => $message]);
  }


  public function edit(string $id)
  {
    $product = Product::firstWhere('i', $id);
    $this->authorize('update', $product);
    return view('product.edit')->with('product', $product);
  }


  public function update(Request $request, string $id)
  {
    $product = Product::firstWhere('i', $id);

    $vD = $request->validate([
      'name' => 'required|string|max:255',
      'price' => 'required',
      'picture' => 'image|mimes:jpeg,png,jpg,gif|max:512',
    ]);

    if ($request->hasFile('picture')) {
      $vD['picture'] = Storage::disk('public')->put('pic/picture', $request->picture);
      if ($product->picture !== null) {
        Storage::disk('public')->delete($product->picture);
      }
    }

    $this->authorize('update', $product);

    $product->update($vD);
    return redirect('product/' . $id);
  }


  public function destroy(string $id, Request $request)
  {
    $product = Product::firstWhere('i', $id);
    $this->authorize('delete', $product);

    if ($product->picture !== null) {
      Storage::disk('public')->delete($product->picture);
    }

    $product->delete();
    return redirect('store/' . $request->s);
  }
}
