<?php
    // variável para o servidor do banco
    $host = "localhost";

    // variável para o usuário de acesso ao banco
    $user = "root";

    // variável para a senha do usuário
    $password = "";

    // variável para o nome do banco
    $dbname = "devstore";

    // tenta conectar ao banco
    try{
        $pdo = new PDO("mysql:host=$host; dbname=$dbname;", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch (PDOException $e){
        die("Falha na conexão: ". $e->getMessage());
    }

?>