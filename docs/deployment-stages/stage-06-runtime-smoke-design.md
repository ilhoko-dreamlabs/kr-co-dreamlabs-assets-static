# Stage 06. Runtime Smoke Design

## Purpose

운영 URL에서 정적 사이트와 대표 asset이 정상 제공되는지 검증한다.

## Smoke URLs

- `https://assets.dreamlabs.co.kr/`
- `https://assets.dreamlabs.co.kr/assets-manifest.json`
- `https://assets.dreamlabs.co.kr/brand/`
- `https://assets.dreamlabs.co.kr/product-logos/`
- `https://assets.dreamlabs.co.kr/footer/`
- `https://assets.dreamlabs.co.kr/brand/dreamlabs/logos/dreamlabs-logo-color.png`
- `https://assets.dreamlabs.co.kr/brand/dreamlabs/favicon/favicon.ico`

## Copy Paste Commands

```powershell
$DOMAIN = "assets.dreamlabs.co.kr"

$urls = @(
  "https://$DOMAIN/",
  "https://$DOMAIN/assets-manifest.json",
  "https://$DOMAIN/brand/",
  "https://$DOMAIN/product-logos/",
  "https://$DOMAIN/footer/",
  "https://$DOMAIN/brand/dreamlabs/logos/dreamlabs-logo-color.png",
  "https://$DOMAIN/brand/dreamlabs/favicon/favicon.ico"
)

$results = foreach ($url in $urls) {
  $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20
  [pscustomobject]@{
    url = $url
    status = [int]$res.StatusCode
    length = $res.RawContentLength
    contentType = $res.Headers.'Content-Type'
  }
}

$results | Format-Table -AutoSize

if (($results | Where-Object { $_.status -ne 200 }).Count -gt 0) {
  throw "runtime smoke failed"
}
```

## Gate

All URLs must return HTTP 200.
