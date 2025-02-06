<?php

use App\Models\Product;
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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('i')->unique();
            $table->string('name');
            $table->string('description');
            $table->string('category');
            $table->text('logo')->nullable();
            $table->foreignIdFor(User::class, 'user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('store_visit', function (Blueprint $table) {
            $table->id();
            $table->string('ip')->nullable();
            $table->foreignIdFor(Store::class, 'store_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Product::class, 'product_id')->nullable()->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
