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

error_reporting(E_ALL);
ini_set("display_errors", 0); 

set_error_handler("dkErrorHandler");
register_shutdown_function("dkErrorCapture");

try
{
	if(is_file(CLASS_PATH . "user" . DS . "userFunction.php")){
		include CLASS_PATH . "user" . DS . "userFunction.php";
	}else{
		throw new Exception('
			사용자 정의 함수가 없는데 괜찮아요? 
			~/classes/user/userFunction.php를 확인하세요.
		');	
	}
}
catch(Exception $e) { dkException($e); }

$fw = new dkFrameWork;

$fw->RunningFW();