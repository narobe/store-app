<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\support\Str;


class User extends Authenticatable
{
  /** @use HasFactory<\Database\Factories\UserFactory> */
  use HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'avatar',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var list<string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function store(): HasMany
  {
    return $this->hasMany(Store::class);
  }

  public function product(): HasMany
  {
    return $this->hasMany(Product::class);
  }

  public function message(): HasMany
  {
    return $this->hasMany(Message::class);
  }

  public static function booted()
  {

    static::creating(function ($user) {
      do {
        $user->i = Str::lower(Str::random(5));
        Str::lower($user->i);
      } while (self::where('i', $user->i)->exists());
    });
  }
}
