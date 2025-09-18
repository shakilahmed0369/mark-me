<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    protected $fillable = ['id', 'title', 'url', 'description', 'category', 'favicon', 'favicon_type'];
}
