// Função para validar o e-mail e o telefone
function validarContato(email, telefone) {
  // Expressão regular para validar e-mail
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Expressão regular para validar telefone (formato brasileiro)
  const telefoneRegex = /^\(?\d{2,3}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;

  // Testa se cada campo está no formato correto
  const emailValido = emailRegex.test(email);
  const telefoneValido = telefoneRegex.test(telefone);

  // Retorna um objeto com o resultado
  return {
    emailValido,
    telefoneValido,
    mensagem: `Email ${emailValido ? 'válido' : 'inválido'} e telefone ${telefoneValido ? 'válido' : 'inválido'}.`
  };
}

// Função chamada ao enviar o formulário
function validarFormulario(event) {
  // Impede que a página recarregue ao enviar o formulário
  event.preventDefault();

  // Pega os valores dos campos do formulário
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

  // Chama a função de validação
  const resultado = validarContato(email, telefone);

  // Mostra a mensagem na tela
  document.getElementById('resultado').textContent = resultado.mensagem;
}
