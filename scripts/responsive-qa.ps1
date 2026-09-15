param([string]$BaseUrl = 'http://localhost:4321')

$ErrorActionPreference = 'Stop'
$session = 'samdigitals-responsive-qa'
$widths = 280,320,333,344,360,375,390,401,412,425,480,540,587,600,640,699,720,768,820,853,912,1024,1117,1180,1280,1366,1379,1440,1536,1728,1920,2560
$routes = '/','/work/','/work/sleep-performance-company/','/services/','/about/','/insights/','/contact/'

function Invoke-Browser([string[]]$Arguments) {
  & npx --yes agent-browser --session $session @Arguments
  if ($LASTEXITCODE -ne 0) { throw "agent-browser failed: $($Arguments -join ' ')" }
}

try {
  Invoke-Browser @('open', "$BaseUrl/") | Out-Null

  foreach ($width in $widths) {
    Invoke-Browser @('set','viewport',"$width",'900') | Out-Null
    $result = Invoke-Browser @('eval', "JSON.stringify({path:location.pathname,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,oversized:Array.from(document.querySelectorAll('body *')).filter(el=>{const r=el.getBoundingClientRect();return r.width>innerWidth+1||r.right>innerWidth+1||r.left< -1}).slice(0,10).map(el=>el.tagName+'.'+el.className)})")
    if ($result -match '\\"oversized\\":\\[(?!\\])' -or $result -match '\\"scrollWidth\\":(?!' + $width + ')') { throw "Responsive failure at ${width}px: $result" }
  }

  foreach ($route in $routes) {
    Invoke-Browser @('open', "$BaseUrl$route") | Out-Null
    foreach ($width in 280,768,1024,1920) {
      Invoke-Browser @('set','viewport',"$width",'900') | Out-Null
      $result = Invoke-Browser @('eval', "JSON.stringify({path:location.pathname,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overlay:Boolean(document.querySelector('.vite-error-overlay'))})")
      if ($result -match '\\"overlay\\":true' -or $result -match '\\"scrollWidth\\":(?!' + $width + ')') { throw "Route failure for $route at ${width}px: $result" }
    }
  }

  Write-Output 'Responsive QA passed.'
}
finally {
  Invoke-Browser @('close') | Out-Null
}
