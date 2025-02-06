<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProductPolicy
{
  public function viewAny(User $user): bool
  {
    return false;
  }

  public function manipulate(User $user, Product $product): bool
  {
    return $user->id == $product->user_id;
  }

  public function view(User $user, Product $product): bool
  {
    // return $user->id == $product->store->user_id;
    return true;
  }

  public function create(User $user): bool
  {
    return false;
  }

  public function update(User $user, Product $product): bool
  {
    return $user->id == $product->store->user_id;
  }

  public function delete(User $user, Product $product): bool
  {
    return $user->id == $product->store->user_id;
  }

  public function restore(User $user, Product $product): bool
  {
    return $user->id == $product->store->user_id;
  }

  public function forceDelete(User $user, Product $product): bool
  {
    return $user->id == $product->store->user_id;
  }
}
