<?php

namespace App\Http\Controllers;

use App\avail;
use App\Models\Store;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class StoreController extends Controller
{
  use AuthorizesRequests;


  public function index()
  {
    if (!Auth::check()) {
      $store = Store::all();
      return view('store.index')->with(['store' => $store]);
    }

    $user = Auth::user();
    $store = Auth::user()->store;
    return view('store.index')->with(['user' => $user, 'store' => $store]);
  }


  public function create()
  {
    $user = Auth::user();
    if ($user->store->count() <= 2) {
      return view('store.create')->with('can', true);
    } else {
      return view('store.create')->with('can', false);
    }
  }


  public function store(Request $request)
  {
    $this->authorize('create');
    $vD = $request->validate([
      'name' => 'required|string|max:255|unique:stores,name',
      'description' => 'required|string',
      'category' => 'required',
      'logo' => 'image|mimes:jpeg,png,jpg,gif|max:512',
    ]);
    if ($request->hasFile('logo')) {
      $vD['logo'] = Storage::disk('public')->put('pic/logo', $request->logo);
    }
    $vD['user_id'] = Auth::user()->id;
    Store::create($vD);
    return redirect()->route('dashboard');
  }


  public function show(string $id, Request $request)
  {
    $store = Store::firstWhere('i', $id);

    avail::s_v_c($store, $request);
    $product = $store->product;

    if (!Auth::check()) {
      return view('store.show')->with(['store' => $store, 'product' => $product]);
    }
    return view('store.show')->with(['store' => $store, 'product' => $product]);
  }


  public function edit(string $id)
  {
    $store = Store::firstWhere('i', $id);
    return view('store.edit')->with('store', $store);
  }


  public function update(Request $request, string $id)
  {
    $store = Store::firstWhere('i', $id);
    $vD = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'required|string',
      'category' => 'required',
      'logo' => 'image|mimes:jpeg,png,jpg,gif|max:512',
    ]);
    if ($request->hasFile('logo')) {
      $vD['logo'] = Storage::disk('public')->put('pic/logo', $request->logo);
      if ($store->logo !== null) {
        Storage::disk('public')->delete($store->logo);
      }
    }
    $store->update($vD);
    return redirect('store/' . $id);
  }


  public function destroy(string $id)
  {
    $store = Store::firstWhere('i', $id);
    $this->authorize('delete', $store);
    if ($store->logo !== null) {
      Storage::disk('public')->delete($store->logo);
    }
    foreach ($store->product as $p) {
      $p->delete();
    }

    $store->delete();
    return redirect()->route('dashboard');
  }
}
