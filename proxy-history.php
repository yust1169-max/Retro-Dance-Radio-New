<?php
$history_url = "https://radio.retrodanceradio.com/public/retro_dance_radio/history";
header("Access-Control-Allow-Origin: *");
echo file_get_contents($history_url);
?>