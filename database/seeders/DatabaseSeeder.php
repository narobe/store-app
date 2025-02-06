<?php

namespace Database\Seeders;

use App\Models\Message;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    User::factory()->cube()->create();
    User::factory(2)->create();

    foreach (User::all() as $user) {
      Store::factory(4)->create(['user_id' => $user]);
    }

    foreach (Store::all() as $store) {
      Product::factory(2)->create(
        [
          'store_id' => $store,
          'user_id' => $store->user->id
        ]
      );
    }

    foreach (Product::all() as $product) {
      Message::factory(4)->create(
        [
          'product_id' => $product,
          'user_id' => $product->store->user->id
        ]
      );
    }
  }
}
