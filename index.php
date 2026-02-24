<!doctype html> 
<html lang="en"> 
<head> 
	<style type="text/css">
		html,body{
			padding: 0;
			margin: 0;
			background: #fff;
			height: 100%;
			overflow: hidden;
			text-align: center;
		}
		#container{
			display: inline-block;
		}
		canvas{
			margin: 0 auto;
		}
	</style>
	<meta charset="UTF-8" />
	<title>MICHELIN POWER - TENTUKAN GAYAMU </title>
</head>
<?php
	$base_url = "https://neji-portfolio.42web.io/power_five/";
	// $base_url = "https://mykindofride.michelin.co.id/";
	// function getRes($act,$base_url){
	// 	$postRequest = array(
	// 	    'act' => $act,
	// 	    'game' => 'Play Game Power Five',
	// 	    'type' => 'public'
	// 	);

	// 	$cURLConnection = curl_init($base_url.'app/api.php');
	// 	curl_setopt($cURLConnection, CURLOPT_POSTFIELDS, $postRequest);
	// 	curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

	// 	$apiResponse = curl_exec($cURLConnection);
	// 	curl_close($cURLConnection);
	// 	return $apiResponse;
	// }
?>

<body>
    <div id="container"></div>

    <script type="text/javascript" src="assets/js/jquery-1.12.4.js"></script>
	<script type="text/javascript" src="assets/js/phaser.min.js"></script>
	<script type="text/javascript" src="assets/js/menu_state.js"></script>
	<script type="text/javascript" src="assets/js/game_state.js"></script>
	<script type="text/javascript" src="assets/js/finish_state.js"></script>
	<script type="text/javascript" src="assets/js/leaderboard_state.js"></script>
    <script type="text/javascript" src="assets/js/engine.js"></script>
	<script type="text/javascript" src="<?= $base_url; ?>js/common.js"></script>

    <script type="text/javascript">
    	var engine = new Engine({
    		// base_url : "<?= $base_url; ?>",
    		geLastScore : function(){
    			var res = [];
    			return res;
    		}
    	});
    </script>
</body>
</html>
