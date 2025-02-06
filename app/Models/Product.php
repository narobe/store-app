<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\support\Str;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $guarded = [];

    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function message(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public static function booted()
    {
        static::creating(function ($product) {
            do {
                $product->i = Str::lower(Str::random(6));
            } while (self::where('i', $product->i)->exists());
        });

        static::deleting(function ($product) {
            if ($product->picture !== null) {
                Storage::disk('public')->delete($product->picture);
            }
        });
    }
}
