<?php
$requests_url = "https://radio.retrodanceradio.com/public/retro_dance_radio/embed-requests";
header("Access-Control-Allow-Origin: *");
echo file_get_contents($requests_url);
?>