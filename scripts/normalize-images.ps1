param([switch]$Apply)

# Script: normalize-images.ps1
# Dry-run: show proposed renames; add -Apply to perform changes

function Normalize-Name($name){
    # remove diacritics
    $norm = $name.Normalize([Text.NormalizationForm]::FormD)
    $norm = -join ($norm.ToCharArray() | Where-Object { [Globalization.CharUnicodeInfo]::GetUnicodeCategory($_) -ne 'NonSpacingMark' })
    $norm = $norm -replace '[^\w\.-]', '-' # replace non word chars with -
    $norm = $norm -replace '-{2,}', '-' # collapse multiple -
    $norm = $norm.Trim('-')
    return $norm.ToLower()
}

$files = Get-ChildItem -Path images -Recurse -File
$renames = @()
foreach ($f in $files){
    $dir = $f.DirectoryName
    $newName = Normalize-Name($f.Name)
    if ($newName -ne $f.Name){
        $newPath = Join-Path $dir $newName
        $relOld = $f.FullName.Substring((Get-Location).Path.Length+1) -replace '\\','/'
        $relNew = $newPath.Substring((Get-Location).Path.Length+1) -replace '\\','/'
        $renames += [PSCustomObject]@{Old=$relOld; New=$relNew}
    }
}

if ($renames.Count -eq 0){
    Write-Output "No files to rename"
} else {
    Write-Output "Proposed renames:`n"
    $renames | ForEach-Object { Write-Output "$_" }
    Write-Output "\nTo apply changes run this script with -Apply`n"
}

if ($Apply){
    foreach ($r in $renames){
        git mv -- "$($r.Old)" "$($r.New)"
        # Update references in HTML files
        (Get-ChildItem -Path . -Filter *.html) | ForEach-Object {
            (Get-Content $_.FullName) -replace ([regex]::Escape($r.Old)), $r.New | Set-Content $_.FullName -Encoding UTF8
        }
        Write-Output "Renamed $($r.Old) -> $($r.New)"
    }
}
