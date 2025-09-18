<?php

namespace App\Http\Controllers\Api;

use App\FileUploadTrait;
use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    use FileUploadTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'url' => 'required|url',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'category' => 'required|integer',
            'favicon' => 'nullable',
        ]);

        if ($request->favicon) {
            if (str_starts_with($request->favicon, 'http') || str_starts_with($request->favicon, 'https')) {
                $validatedData['favicon'] = $request->favicon;
                $validatedData['favicon_type'] = 'url';
            } else {
                $validatedData['favicon'] = $this->uploadFile($request->favicon);
                $validatedData['favicon_type'] = 'file';
            }
        }

        $bookmark = Bookmark::create($validatedData);

        return response()->json($bookmark, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
