$minZoom = 1
$maxZoom = 10

# Define the bounding box for Algeria
$bbox = "-8.67,19.5,11.99,37.1"

# Split the bounding box coordinates
$bboxArray = $bbox.Split(",")

# Extract individual coordinates
$minLon = [double]$bboxArray[0]
$minLat = [double]$bboxArray[1]
$maxLon = [double]$bboxArray[2]
$maxLat = [double]$bboxArray[3]

# Iterate over zoom levels
for ($z = $minZoom; $z -le $maxZoom; $z++) {
    # Calculate tile coordinates for the bounding box
    $minTileX = [Math]::Floor(([Math]::Pow(2, $z) * (($minLon + 180) / 360)))
    $maxTileX = [Math]::Floor(([Math]::Pow(2, $z) * (($maxLon + 180) / 360))) - 1
    $minTileY = [Math]::Floor(([Math]::Pow(2, $z) * (1 - ( [Math]::Log([Math]::Tan(($maxLat * [Math]::PI / 180) / 2 + [Math]::PI / 4)) / [Math]::PI)) / 2))
    $maxTileY = [Math]::Floor(([Math]::Pow(2, $z) * (1 - ( [Math]::Log([Math]::Tan(($minLat * [Math]::PI / 180) / 2 + [Math]::PI / 4)) / [Math]::PI)) / 2)) - 1

    # Iterate over tiles within the bounding box
    for ($x = $minTileX; $x -le $maxTileX; $x++) {
        for ($y = $minTileY; $y -le $maxTileY; $y++) {
            $url = "https://tile.openstreetmap.org/$z/$x/$y.png"
            $filename = "$z-$x-$y.png"
            Invoke-WebRequest $url -OutFile $filename
        }
    }
}
