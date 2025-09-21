<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Category extends Model
{
    protected $fillable = ['name', 'icon'];

   function bookmarks() : HasMany {
    return $this->hasMany(Bookmark::class, 'category', 'id');
   }
}
