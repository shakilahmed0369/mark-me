<?php

namespace App;

use Illuminate\Support\Str;

trait FileUploadTrait
{

    public function uploadFile($file, $path = '/uploads'): ?string
    {
        try {
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path($path), $fileName);
            return $path . '/' . $fileName;
        } catch (\Throwable $th) {
            throw $th;
        }

        return null;
    }
}
