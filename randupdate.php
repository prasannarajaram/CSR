<?php
$a = $_POST['LIT805Sim'];
$b = $_POST['PIT804Sim'];
$c = $_POST['PT810Sim'];
$d = $_POST['JT809Sim'];
$e = $_POST['JT854Sim'];
$f = $_POST['PT852Sim'];
$g = $_POST['TT807Sim'];
$h = $_POST['TT808Sim'];
$i = $_POST['TT806Sim'];
$j = $_POST['TT853Sim'];

try {
include 'connect.php';
// $stmt = $db->prepare("INSERT INTO aivar (LIT805,PIT804,PT810,JT809,JT854,PT852,TT807,TT808,TT806,TT853)
$stmt = $db->prepare("INSERT INTO aivar (LIT805,PIT804,PT810,JT809,JT854,PT852,TT807,TT808,TT806,TT853)
                    VALUES (:a,:b,:c,:d,:e,:f,:g,:h,:i,:j)");
                    // VALUES (:a,:b,:c,:d,:e,:f,:g,:h,:i,:j)");
$stmt->bindValue(':a',$a); 
$stmt->bindValue(':b',$b); 
$stmt->bindValue(':c',$c);
$stmt->bindValue(':d',$d); 
$stmt->bindValue(':e',$e); 
$stmt->bindValue(':f',$f); 
$stmt->bindValue(':g',$g); 
$stmt->bindValue(':h',$h); 
$stmt->bindValue(':i',$i); 
$stmt->bindValue(':j',$j); 
$stmt->execute();
}
catch(Exception $e){
    echo $e->getMessage();
}
?>                    