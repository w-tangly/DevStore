<?php
    // Cabeçalhos para o navegador
    header("Content-Type:application/json");
    header("charset=utf-8");
    
    // Chama a conexão
    include 'db.php';

    // Cria uma variável para receber o método da requisição
    $method = $_SERVER['REQUEST_METHOD'];

    // Cria uma variável para armazenar os dados enviados do Front End
    $input = json_decode(file_get_contents('php://input'), true, JSON_UNESCAPED_UNICODE);

    // Verifica o método requisitado
    switch($method){
        case 'GET':  //Caso seja GET, faz a consulta
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

    // Função para fazer a consulta sem filtro
    function handleGet($pdo){
        // Cria o SQL para ser executado
        $sql = "SELECT * FROM tblprodutos";

        // Prepara a execução
        $stmt = $pdo -> prepare($sql);

        // Executa a consulta na base
        $stmt -> execute();

        // Variável para armazenar os resultados
        $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);

        // Exibe em formato Json
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    }
?>