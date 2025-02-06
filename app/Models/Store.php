<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\support\Str;

class Store extends Model
{
    /** @use HasFactory<\Database\Factories\StoreFactory> */
    use HasFactory;


    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function product(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public static function booted()
    {
        static::creating(function ($product) {
            do {
                $product->i = Str::lower(Str::random(5));
            } while (self::where('i', $product->i)->exists());
        });
        static::deleting(function ($store) {
            if ($store->logo !== null) {
                Storage::disk('public')->delete($store->logo);
            }
        });
    }
}
