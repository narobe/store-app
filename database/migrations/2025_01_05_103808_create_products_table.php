<?php

use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('products', function (Blueprint $table) {
      $table->id();
      $table->string('i')->unique();
      $table->string('name');
      $table->string('picture')->nullable();
      $table->integer('price');
      $table->integer('category');
      $table->integer('description');
      $table->foreignIdFor(User::class, 'user_id')->constrained()->cascadeOnDelete();
      $table->foreignIdFor(Store::class, 'store_id')->constrained()->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
