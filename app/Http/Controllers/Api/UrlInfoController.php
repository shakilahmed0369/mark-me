<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class UrlInfoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate(['url' => 'required|url']);
        $url = $request->input('url');

        try {
            $response = Http::get($url);

            if (!$response->successful()) {
                return null;
            }

            $html = $response->body();
            $crawler = new Crawler($html);

            // Title
            $title = $crawler->filter('title')->count()
                ? $crawler->filter('title')->text()
                : null;

            // Description (meta description)
            $description = $crawler->filterXPath('//meta[@name="description"]')->count()
                ? $crawler->filterXPath('//meta[@name="description"]')->attr('content')
                : null;

            // Favicon
            $favicon = null;
            if ($crawler->filterXPath('//link[@rel="icon"]')->count()) {
                $favicon = $crawler->filterXPath('//link[@rel="icon"]')->attr('href');
            } elseif ($crawler->filterXPath('//link[@rel="shortcut icon"]')->count()) {
                $favicon = $crawler->filterXPath('//link[@rel="shortcut icon"]')->attr('href');
            }

            // If favicon is relative, make it absolute
            if ($favicon && !preg_match('/^https?:\/\//', $favicon)) {
                $parsedUrl = parse_url($url);
                $baseUrl = $parsedUrl['scheme'] . '://' . $parsedUrl['host'];
                $favicon = rtrim($baseUrl, '/') . '/' . ltrim($favicon, '/');
            }

            return [
                'title'       => $title,
                'description' => $description,
                'favicon'     => $favicon,
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
            ];
        }
    }
}
