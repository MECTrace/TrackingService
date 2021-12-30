<?php

# session start

session_start();

header("Content-Type: text/html; charset=UTF-8");

ini_set("date.timezone", "Asia/Seoul");

define ('DS', DIRECTORY_SEPARATOR);
define ('ROOT_PATH', __DIR__ . DS);