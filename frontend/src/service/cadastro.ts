// Trazendo o formulario 
const formularioCadastro = document.getElementById('formulario-cadastro') as HTMLFormElement;

if (formularioCadastro) {
    
    formularioCadastro.addEventListener('submit', (carregarForm) => {

        carregarForm.preventDefault();

        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const senhaInput = document.getElementById('senha');

        if (nomeInput instanceof HTMLInputElement && emailInput instanceof HTMLInputElement && senhaInput   instanceof HTMLInputElement) {

            const name = nomeInput.value;
            const email = emailInput.value;
            const password = senhaInput.value;

            if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
                return alert("Preencha todos os campos corretamente");
            };

            const URL = "https://saas-analisador-de-curriculo.onrender.com";

            try {
                fetch(`${URL}/cadastroDeUsuarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    nome: name,
                    email: email,
                    senha: password
                })
                })
                .then((res) => res.json())
                .then((dados) => {

                    console.log(dados);
                    
                    if (dados.mensagem === "Cadastre-se") {
                        return alert("Cadastre-se");
                    };

                    if (dados.mensagem === "Essa conta ja esta cadastrada.") {
                        return alert("Essa conta ja esta cadastrada.");
                    };

                    if (dados.mensagem === "Conta cadastrada com sucesso.") {
                        return alert ("Conta cadastrada com sucesso.");
                    };

                })
            } catch (error) {
                console.log(error);
                return alert("Erro no servidor ")
            }
        };

    });
};