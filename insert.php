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
$k = $_POST[mp516a];
$l = $_POST['mp516t'];
$m = $_POST['ABV811'];
$n = $_POST['ABV812'];
$o = $_POST['ABV813'];
$p = $_POST['ABV814'];
$q = $_POST['ABV815'];
$r = $_POST['ABV816'];
$s = $_POST['ABV850'];
$t = $_POST['ABV851'];
$u = $_POST['Step'];

try {
include 'connect.php';
// $stmt = $db->prepare("INSERT INTO aivar (LIT805,PIT804,PT810,JT809,JT854,PT852,TT807,TT808,TT806,TT853)
$stmt = $db->prepare("INSERT INTO aivar (LIT805,PIT804,PT810,JT809,JT854,PT852,TT807,TT808,TT806,TT853,
                                        mp516a,mp516t,ABV811,ABV812,ABV813,ABV814,ABV815,ABV816,ABV850,ABV851,Step)
                    VALUES (:a,:b,:c,:d,:e,:f,:g,:h,:i,:j,:k,:l,:m,:n,:o,:p,:q,:r,:s,:t,:u)");
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
$stmt->bindValue(':k',$k);
$stmt->bindValue(':l',$l);
$stmt->bindValue(':m',$m);
$stmt->bindValue(':n',$n);
$stmt->bindValue(':o',$o);
$stmt->bindValue(':p',$p);
$stmt->bindValue(':q',$q);
$stmt->bindValue(':r',$r);
$stmt->bindValue(':s',$s);
$stmt->bindValue(':t',$t);
$stmt->bindValue(':u',$u);
$stmt->execute();
}
catch(Exception $e){
    echo $e->getMessage();
}
?>                    