// Função para validar o login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificando se os campos não estão vazios
    if (username === "" || password === "") {
        alert("Por favor, preencha todos os campos!");
    } else {
        // Simulando login bem-sucedido (aqui você pode fazer a verificação real)
        alert("Login bem-sucedido!");
        // Redirecionar para a página de sobre ou outra página (exemplo)
        window.location.href = "sobre.html";
    }
});

