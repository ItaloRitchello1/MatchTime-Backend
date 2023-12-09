URL1 = 'https://match-time-backend.vercel.app/users'
URL2 = 'https://match-time-backend.vercel.app/games'

window.addEventListener('DOMContentLoaded', (e) => renderHeaderPfp());


const container = document.querySelector('.profile');
const HeaderPfp = document.querySelector('.header-picture');

const renderHeaderPfp = async () => {
    const res1 = await fetch(URL1);
    const profiles = await res1.json();
    const idUsuarioLogado = localStorage.getItem("idUsuarioLogado");

    if (localStorage.getItem("idUsuarioLogado")  == null || localStorage.getItem("idUsuarioLogado")  == -1) {
        //console.log(localStorage.getItem("idUsuarioLogado"));
        let fotinha = '';

        fotinha += `
        <a class="nav-link dropdown-toggle mouse-efeito-navbar" href="#" role="button"data-bs-toggle="dropdown" aria-expanded="false"><img src="img/perfil.png"width="50px"></a>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item dpdefect" href="login.html">Fazer login</a></li>
            <li><a class="dropdown-item dpdefect" href="register.html">Criar conta</a></li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item dpdefect" href="index.html">Sair</a></li>
        </ul>
        `;

        HeaderPfp.innerHTML = fotinha;

    } else {
        //console.log(localStorage.getItem("idUsuarioLogado"));
        let fotinha = '';

        fotinha += `
        <a class="nav-link dropdown-toggle mouse-efeito-navbar" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="${profiles[idUsuarioLogado].foto}" style="border-radius: 30px;" width="50px">
        </a>
        <ul class="dropdown-menu">
        <li><a class="dropdown-item dpdefect" href="Gprofile.html">Ver perfil</a></li>
            <li><a class="dropdown-item dpdefect" href="editprofile.html">Editar perfil</a></li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><button id="botao-sair" type="button" class="dropdown-item dpdefect" onclick="deslogar()">Sair</button></li>
        </ul>
        `;

        HeaderPfp.innerHTML = fotinha;
    }
}

const renderProfile = async () => {
    const res1 = await fetch(URL1);
    const res2 = await fetch(URL2);
    const profiles = await res1.json();
    const games = await res2.json();

    const idUsuarioLogado = localStorage.getItem("idUsuarioLogado");


    let perfil = '';


    perfil += `
            <div class="container">
            <div class="container mt-5">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 text-center">
                        <h2>${profiles[idUsuarioLogado].nome}</h2>
                        <img src="${profiles[idUsuarioLogado].foto}" style="width: 30%;" alt="Foto de Perfil">
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <h4>Bio do Jogador</h4>
                        <p>${profiles[idUsuarioLogado].bio}</p>
                        <a class="btn button-gamer" href="editprofile.html">Editar Perfil</a>
                    </div>
                </div> 

                <h4
                    style="margin: 50px;text-align: left; color:white; text-shadow: 0 0 0.2em #87F, 0 0 0.2em #87F, 0 0 0.2em #87F">
                    Jogos Jogados
                </h4>`;


    perfil += `<ul class="list-unstyled game-list row">`

    for (let i = 0; i < profiles[idUsuarioLogado].idJogos.length; i++) {
        let j = profiles[idUsuarioLogado].idJogos[i];

        perfil += `
                <li class="col-lg-6 col-md-12 col-sm-12">
                <img class="game-image" style="width: 25%;" src="${games[j].fotoCard}" alt="${games[j].nome}"">
                <h5 class="game-name">${games[j].nome}</h5>
                </li>
                `
    }

    perfil += `</ul>`

    container.innerHTML = perfil;
}

const deslogar = async () => {
    localStorage.setItem("idUsuarioLogado", "-1");
    window.location.replace('/index.html');
}

window.addEventListener('DOMContentLoaded', (e) => renderProfile());
window.addEventListener('DOMContentLoaded', (e) => renderHeaderPfp());


const validateUser = async (userEmail, userPassword) => {
    const res1 = await fetch(URL1);
    const profiles = await res1.json();

    var emailExist = false;
    var idUserFound = -1;

    profiles.forEach(user => {
        if (user.email == userEmail) {
            //console.log("Email encontrado");

            emailExist = true;
            idUserFound = user.id;
        } else {
            //console.log("Email não encontrado");
        }
    });

    if (emailExist && profiles[idUserFound].senha == userPassword) {
        localStorage.setItem("idUsuarioLogado", idUserFound);
        window.location.replace('/index.html');
    } else {
        alert("Dados incorretos.");
    }


}

const form = document.querySelector("#userLogin");
if (form) {
    const fields = ["inputEmail", "inputPassword"];

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let userEmail = document.querySelector(`#${fields[0]}`).value;
        let userPassword = document.querySelector(`#${fields[1]}`).value;

        if (userEmail == false || userPassword == false) {
            alert("Gentileza preencher todos os campos");
        } else {
            //console.log(userEmail);
            //console.log(userPassword);

            validateUser(userEmail, userPassword);

        }

    });



    //const validator = new Login(form, fields);
}


