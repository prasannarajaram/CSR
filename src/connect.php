<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Hello PHP page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <link rel="stylesheet" type="text/css" media="screen" href="main.css" /> -->
    <!-- <script src="main.js"></script> -->
</head>
<body>
<?php echo '<p> Hello World </p>'; 
// phpinfo();
// $variable = $_POST['fname'];
// echo $variable;
try {
    $db = new PDO('mysql:host=localhost;dbname=process;charset=utf8','root','');
    // var_dump($db) ;
}
catch(Exception $e){
    echo $e->getMessage();
}
?>
</body>
</html>