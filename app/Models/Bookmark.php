<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Bookmark extends Model
{
    protected $fillable = ['id', 'title', 'url', 'description', 'category', 'favicon', 'favicon_type'];


    function category() : HasOne
    {
        return $this->hasOne(Category::class, 'id', 'category');
    }
}
