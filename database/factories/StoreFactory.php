<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $uc = count(User::all());

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'name' => fake()->streetName(),
            'category' => fake()->city(),
            'description' => fake()->paragraph(2),
            // 'user_id' => fake()->numberBetwee(1, $uc),
        ];
    }
}
