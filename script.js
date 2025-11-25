const livrosIniciais = [
    {
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        capa: "https://covers.openlibrary.org/b/id/10523366-L.jpg",
        pdf: "https://ddcus.org/pdf/summer_reading/11th_grade/Dom_Casmurro-Machado_de_Assis.pdf"
    },
    {
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        capa: "https://covers.openlibrary.org/b/id/10982241-L.jpg",
        pdf: "https://www.sesirs.org.br/sites/default/files/paragraph--files/o_pequeno_principe_-_antoine_de_saint-exupery_1.pdf"
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        capa: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
        pdf: "https://www.dhnet.org.br/direitos/anthist/marcos/hdh_george_orwell_1984.pdf"
    },
    {
        titulo: "O Hobbit",
        autor: "J.R.R. Tolkien",
        capa: "https://covers.openlibrary.org/b/id/10291366-L.jpg",
        pdf: "https://pdfteca.com/wp-content/uploads/2024/12/O-Hobbit-J.R.R.-Tolkien.pdf"
    }
];

let livros = JSON.parse(localStorage.getItem("livros")) || livrosIniciais;
let usuarioLogado = localStorage.getItem("usuarioLogado");

function renderizarLivros(filtro = "") {
    const container = document.getElementById("livros");
    container.innerHTML = "";

    livros.filter(l =>
        l.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        l.autor.toLowerCase().includes(filtro.toLowerCase())
    ).forEach((livro, i) => {
        const div = document.createElement("div");
        div.className = "livro";
        div.innerHTML = `
            <img src="${livro.capa || 'https://via.placeholder.com/150'}" alt="Capa do Livro">
            <h3>${livro.titulo}</h3>
            <p>${livro.autor}</p>
            <button onclick="lerLivro(${i})">📖 Ler Online</button>
        `;
        container.appendChild(div);
    });
}

function buscarLivros() {
    const termo = document.getElementById("campoBusca").value;
    renderizarLivros(termo);
}

function adicionarLivro() {
    if (!usuarioLogado) {
        alert("Você precisa estar logado para adicionar livros!");
        return;
    }

    const titulo = document.getElementById("tituloLivro").value.trim();
    const autor = document.getElementById("autorLivro").value.trim();
    const capa = document.getElementById("urlCapa").value.trim();
    const pdf = document.getElementById("urlPDF").value.trim();

    if (titulo && autor) {
        livros.push({ titulo, autor, capa, pdf });
        localStorage.setItem("livros", JSON.stringify(livros));
        renderizarLivros();
        alert("Livro adicionado com sucesso!");

        document.getElementById("tituloLivro").value = "";
        document.getElementById("autorLivro").value = "";
        document.getElementById("urlCapa").value = "";
        document.getElementById("urlPDF").value = "";
    } else {
        alert("Preencha o título e o autor!");
    }
}

function cadastrar() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario && senha) {
        localStorage.setItem("usuario_" + usuario, senha);
        alert("Usuário cadastrado com sucesso!");
    } else {
        alert("Preencha usuário e senha.");
    }
}

function login() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const senhaSalva = localStorage.getItem("usuario_" + usuario);

    if (senhaSalva === senha) {
        usuarioLogado = usuario;
        localStorage.setItem("usuarioLogado", usuario);
        alert("Bem-vindo, " + usuario + "!");
        document.getElementById("login").classList.add("hidden");
        document.getElementById("btnLogout").classList.remove("hidden");
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    usuarioLogado = null;
    alert("Você saiu da conta.");
    document.getElementById("btnLogout").classList.add("hidden");
}

function mostrarSeção(secao) {
    document.getElementById("livros").classList.add("hidden");
    document.getElementById("adicionar").classList.add("hidden");
    document.getElementById("login").classList.add("hidden");
    document.getElementById("leitura").classList.add("hidden");

    if (secao === "livros") document.getElementById("livros").classList.remove("hidden");
    if (secao === "adicionar") document.getElementById("adicionar").classList.remove("hidden");
    if (secao === "login") document.getElementById("login").classList.remove("hidden");
    if (secao === "leitura") document.getElementById("leitura").classList.remove("hidden");
}

function lerLivro(i) {
    const livro = livros[i];
    window.open(livro.pdf, "_blank");
}

if (usuarioLogado) {
    document.getElementById("btnLogout").classList.remove("hidden");
}

renderizarLivros();


