<?php

# session start

session_start();

header("Content-Type: text/html; charset=UTF-8");

ini_set("date.timezone", "Asia/Seoul");

define ('DS', DIRECTORY_SEPARATOR);
define ('ROOT_PATH', __DIR__ . DS);

define ('CLASS_PATH', ROOT_PATH . "classes" . DS);
define ('SYSTEM_CLASS_PATH', ROOT_PATH . "classes" . DS . "system" . DS);

define ('MODULE_PATH', ROOT_PATH . "module" . DS);

use classes\system\framework\dkFrameWork;

include SYSTEM_CLASS_PATH . "framework" . DS . "dkFunction.php";