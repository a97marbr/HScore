<?php

// Get credentials for db
include_once("../highscorepw.php");

$debug = array();
$data = array();
$sql = "";

$pdo;
try {
	$pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8', DB_USER,	DB_PASSWORD);
} catch (PDOException $e) {
	echo "Failed to get DB handle: " . $e->getMessage() . "</br>";
	exit;
}
// Get the params submitted
if (isset($_POST['params']) && !empty($_POST['params'])) {
	$params = json_decode($_POST['params'], true);
} else {
	$params = null;
}

array_push($debug, $params);

$p = $params["player"];
$s = $params["score"];

checkPlayerName($p);

addScore($p, $s);

getHighscore("D");

/*
 * Check if player name is too long, if so, crop
 * Check if player name is not in blacklist of names
 * If so - rename to 'UNK'
 */
function checkPlayerName(&$p){

	$blacklist = array("kuk");

	if (strlen($p)>3){
		$p = substr ( $p , 0 , 3);
	}

	$tmp = $p;

	if (in_array(strtolower($tmp), $blacklist)) {
    $p = "UNK";
	}

}


/*
* Try to add a highscore
* TODO: protect against cheating
*/
function addScore($name, $score)
{

	global $pdo;
	global $sql;
	$sql = "INSERT INTO score (player, score, date) VALUES('". $name ."'," .$score. ', NOW());';

	//array_push($debug, $sql);

	if ($sql != null) {

		$pdo -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		$sth = $pdo -> prepare($sql);
		$sth -> execute();
		$res = $sth -> fetchAll();
		
		
	}


}

/*
*	Get current highscore.
* 
* Params: W - current week, D - current day, A - all time high
*
*/
function getHighscore($highscoreType)
{
	global $pdo;
	global $sql;
	global $data;

	if ($highscoreType == "D"){
		$sql = "select player, score from score WHERE DATE(date) = DATE(NOW()) ORDER BY score DESC LIMIT 3;";	
	} else {
		$sql = "select player, score from score ORDER BY score DESC LIMIT 3;";

	}
	
	

	if ($sql != null) {

		$pdo -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		$sth = $pdo -> prepare($sql);
		$sth -> execute();
		$data = $sth -> fetchAll();
			
	}
}

$array = array(
	"debug" => $debug,
	"data" => $data,
);

header('Content-type: application/json');
echo json_encode($array);
