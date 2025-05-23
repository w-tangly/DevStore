<?php
    //cabeçalhos para o navegador
    header("Content-Type:application/json");
    header("charset=utf-8");
    //chama a conexao
    include 'db.php';
    //cria uma variavel para receber o método
    //da requisicao
    $method = $_SERVER['REQUEST_METHOD'];
    //cria uma variavel para armazenar 
    // os dados enviados do frontend
    $input = json_decode(
        file_get_contents('php://input'), true,
        JSON_UNESCAPED_UNICODE);
    //VERIFICA O METODO REQUISITADO
    switch($method){
        case 'GET'://caso seja get, faz a consulta
            if(isset($_GET['descProd'])){
                handleGetFiltro($pdo);
            }else if(isset($_GET['idProd'])){
                handleGetFiltroID($pdo);
            }else if(isset($_GET['categoriaProd'])){
                handleGetFiltroCategoria($pdo);
            }else{
                handleGet($pdo);
            }
    }
    //função para fazer a consulta sem filtro
    function handleGet($pdo){
        //cria o sql para ser executado
        $sql = "SELECT * from tblProdutos";
        //prepara a execução
        $stmt = $pdo->prepare($sql);
        //executa a consulta na base
        $stmt->execute();
        //variavel para armazenar os resultados
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //exibe em formato json
        echo json_encode($result, 
        JSON_UNESCAPED_UNICODE);
    }

    // função para trazer os produtos com filtro de id
    function handleGetFiltroID($pdo){
        // variável para pegar o valor do filtro
        $filtro = $_GET['idProd'];

        // sql para a consulta
        $sql = "SELECT * from tblProdutos where idProd='$filtro'";

        // prepara a execução 
        $stmt = $pdo -> prepare($sql);

        // executa o comando o sql
        $stmt->execute();

        // variável para receber os dados resultantes
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // exibe os dados em formato json
        echo json_encode($result, JSON_UNESCAPED_UNICODE);  
    }

    function handleGetFiltroCategoria($pdo){
        // variável para capturar o valor do filtro
        $filtro = $_GET['categoriaProd'];

        // sql para consultar na base
        $sql = "SELECT * FROM tblProdutos WHERE categoriaProd = '$filtro'";

        // stmt para preparar a execução
        $stmt = $pdo->prepare($sql);

        // executa a consulta
        $stmt->execute();

        // variável para receber os dados
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // exibe os dados em json
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }
?>