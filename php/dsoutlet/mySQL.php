<?php
	
	date_default_timezone_set('America/Bahia');
    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Content-Type: application/json; charset=UTF-8");

	$hostname = "mysql.hostinger.com.br";
	$username = "u929128676_admin";
	$password = "teste123";
	$database = "u929128676_ds";
	//conectando ao banco
	$con = mysqli_connect($hostname, $username, $password, $database) or die (mysqli_error());
?>