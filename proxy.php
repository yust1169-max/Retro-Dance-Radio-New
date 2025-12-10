<?php
$stream_url = "https://radio.retrodanceradio.com/listen/retro_dance_radio/radio.mp3";

header("Access-Control-Allow-Origin: *");
header("Content-Type: audio/mpeg");

$ch = curl_init($stream_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_exec($ch);
curl_close($ch);
?>