<?php

namespace Database\Factories;

use App\avail;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    // $sc = count(Store::all());
    return [
      'user_id' => User::inRandomOrder()->first()->id,
      'name' => fake()->word(1),
      'category' => fake()->randomElement(avail::all_cats()),
      'description' => fake()->paragraph(),
      'price' => fake()->randomNumber(nbDigits: 4),
      // 'store_id' => fake()->numberBetween(1, $sc),
    ];
  }
}
