<?php 
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Content-Type: application/json; charset=UTF-8");
?>
<?php
	$hostname = "localhost";
	$username = "root";
	$password = "lucas123";
	$database = "dsoutlet";
	//conectando ao banco
	$con = mysqli_connect($hostname, $username, $password, $database) or die (mysqli_error());
?>