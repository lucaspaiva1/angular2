<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$divida = $request->divida;
		$id     = $divida->id;
		
		$valor  = $divida->valorRecebido;
		$venc   = $divida->vencimento;
		
		$sql = "SELECT * FROM divida WHERE id = '$id'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$dados = $result->fetch_assoc();
			$parc  = $dados['parcelasAPagar'];
			
			$value = $dados['valor'];
			$value = $value - $valor;
			
			if ($value > 0) {
				if ($parc > 1)
					$parc = $parc - 1;
				else
					$parc = 1;
				
				$mes = date('Y-m-d', strtotime('+1 month', strtotime($venc)));
				
				$sql = "UPDATE divida SET valor = '$value', parcelasAPagar = '$parc', vencimento = '$mes' WHERE id = '$id'";
				$con->query($sql);
			} else {
				$sql "DELETE FROM divida WHERE id = '$id'";
				$con->query($sql);
			}
			echo json_encode(true);
		}
	}
?>