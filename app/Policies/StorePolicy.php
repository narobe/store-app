<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Store;

class StorePolicy
{
  use AuthorizesRequests;

  public function manipulate(User $user, Store $store): bool
  {
    return $user->id == $store->user_id;
  }

  public function viewAny(User $user): bool
  {
    return false;
  }

  public function view(User $user, Store $store): bool
  {
    // return $user->id == $store->user_id;
    return true;
  }

  public function create(User $user): bool
  {
    return $user->store->count() <= 6;
  }

  public function update(User $user, Store $store): bool
  {
    return $user->id == $store->user_id;
  }

  public function delete(User $user, Store $store): bool
  {
    return $user->id == $store->user_id;
  }

  public function restore(User $user, Store $store): bool
  {
    return $user->id == $store->user_id;
  }

  public function forceDelete(User $user, Store $store): bool
  {
    return $user->id == $store->user_id;
  }
}
