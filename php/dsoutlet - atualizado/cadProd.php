<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
		
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$marca 		= $request->marca;
		$modelo 	= $request->modelo;
		$tamanho  	= $request->tamanho;
		$quantidade = $request->quantidade;
		$precoE     = $request->precoEntrada;
		$precoS	    = $request->precoSaidaPadrao;
		$max	    = $request->maximo;
		$min	    = $request->minimo;
		$usuarioID  = $request->usuarioId;
		
		date_default_timezone_set('America/Bahia');
		$today = date('Y-m-d H:i:s');
		
		$sql = "SELECT * FROM produto WHERE marca = '$marca' AND modelo = '$modelo' AND tamanho = '$tamanho' AND precoEntrada = '$precoE'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
			if($numrow !== 1 && $marca != ""){
				$sql = "INSERT INTO produto (marca, modelo, tamanho, quantidade, precoEntrada, precoSaidaPadrao, maximo, minimo, dataUltimaCompra, ativo) VALUES ('$marca', '$modelo', '$tamanho', '$quantidade','$precoE', '$precoS', '$max', '$min', '$today', '0')";
				$con->query($sql);
				
				$sql = "SELECT * FROM produto WHERE marca = '$marca' AND modelo = '$modelo' AND tamanho = '$tamanho' AND quantidade = '$quantidade' AND precoEntrada = '$precoE' AND precoSaidaPadrao = '$precoS' AND maximo = '$max' AND minimo = '$min' AND dataUltimaCompra = '$today' AND ativo = '0'";
				$result = $con->query($sql);
				
				$numrow2 = $result->num_rows;
				
				$cadastrou = false;
				
				if ($numrow2 > 0){
					$cadastrou = true;
					$dados  = $result->fetch_assoc();
					$prodID = $dados['id'];
				
					$sql = "INSERT INTO registro (tempo, loja_id, usuario_id, tipo, quantidade, produto_id) VALUES ('$today', '1', '$usuarioID', 'e', '$quantidade', '$prodID')";
					$con->query($sql);
				}
					
				else{
					$cadastrou = false;
				}
				
				
				echo json_encode($cadastrou);
			}else{
				$dados = $result->fetch_assoc();
				$id = $dados['id'];
				
				$amount = $dados['quantidade'];
				$amount = $amount + $quantidade;
				
				$sql = "UPDATE produto SET ativo = '0', quantidade = '$amount', maximo = '$max', minimo = '$min', precoSaidaPadrao = '$precoS' WHERE id = '$id'";
				$con->query($sql);
				
				$sql = "INSERT INTO registro (tempo, loja_id, usuario_id, tipo, quantidade, produto_id) VALUES ('$today', '1', '$usuarioID', 'e', '$quantidade', '$id')";
				$con->query($sql);
				echo json_encode(true);
			}
	}
?>