# Script: update-html-alts.ps1
# Adds alt attributes (from h1) and loading="lazy" to product images inside .category-right-content-item
# Also inserts Open Graph and Twitter meta tags if missing

$files = Get-ChildItem -Path . -Filter *.html
foreach ($file in $files) {
    $text = Get-Content $file.FullName -Raw

    # Add alt and loading for product images based on following <h1>
    $pattern = '<div class="category-right-content-item">(.*?)<img\s+([^>]*?)src="(?<src>[^"]+)"([^>]*?)>(.*?)<h1>(?<title>.*?)</h1>'
    $newText = [regex]::Replace($text, $pattern, {
        param($m)
        $inner = $m.Groups[1].Value
        $preImgAttrs = $m.Groups[2].Value
        $src = $m.Groups['src'].Value
        $postImgAttrs = $m.Groups[3].Value
        $afterImg = $m.Groups[4].Value
        $title = $m.Groups['title'].Value.Trim()

        # build new img tag: if alt exists, keep it; else add alt and loading
        $imgTag = "<img $preImgAttrs src=\"$src\" $postImgAttrs alt=\"$title\" loading=\"lazy\">"
        return "<div class=\"category-right-content-item\">$inner$imgTag$afterImg<h1>$title</h1>"
    }, 'Singleline')

    # Insert basic Open Graph & Twitter meta if not present
    if ($newText -notmatch 'property="og:title"') {
        $og = "    <meta property=\"og:title\" content=\"DCShop - Cửa hàng công nghệ\">`n    <meta property=\"og:description\" content=\"Cửa hàng DCShop - điện thoại, laptop, PC và phụ kiện chính hãng\">`n    <meta property=\"og:image\" content=\"images/dcshoplogo.png\">`n    <meta name=\"twitter:card\" content=\"summary_large_image\">"
        $newText = $newText -replace '(?<=<meta name="description" content="[^"]+">)',("`n" + $og)
    }

    if ($newText -ne $text) {
        Set-Content -Path $file.FullName -Value $newText -Encoding UTF8
        Write-Output "Updated $($file.Name)"
    }
}
Write-Output "Done updating HTML files."