const body = document.querySelector("body")
const Mensagem = document.querySelector("#Mensagem")
const h2 = document.createElement("h2")
var somErro = new Audio('./audio/Som_de_erro.mp3');
var somAcerto = new Audio('./audio/Som_de_acerto.mp3');

const url = "./questoes.json"

let cont = 1;

async function getQuestoes() {
  let acertou = 0;

  const res = await fetch(`${url}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  const data = await res.json();

  data.map((a, i) => {
    const div = document.createElement("div");
    const Questoes = document.createElement("h1")
    const Questao = document.createElement("h3");

    Questoes.innerText = ("Questão " + (i+1));
    Questoes.classList.add('Titulo')
    body.appendChild(Questoes)

    Questao.innerText = a.questao;
    div.appendChild(Questao)


    if (i > 0) {
      div.classList.add("hide");
      Questoes.classList.add("hide");
    }

    div.classList.add("show");
    div.id = `pergunta_${i}`;

    for (j = 0; j <= 3; j++) {
      const button = document.createElement("button");
      button.setAttribute = (j, a.respostas[j].alternativa[1]);
      const resposta = button.setAttribute
      button.innerText = a.respostas[j].alternativa[0];
      div.appendChild(button);
      button.addEventListener("click", contador = (e) => {
        //Se for verdadeiro é somado um ponto
        //E enviado como parametro da função mensagens

        if (resposta === true) {
          acertou++
          setTimeout(function(){mensagens(acertou)},2000)
          button.style.backgroundColor = "#2E8B57"
          somAcerto.play()
        } else {
          //Se for falso não é somado nenhum ponto
          //mas é enviado como parametro da função mensagens
          setTimeout(function(){mensagens(acertou)}, 2000)
          button.style.backgroundColor = "#DC143C"
          somErro.play()
        }

        div.style.pointerEvents = "none";

        setTimeout(function () { removerPergunta(cont++) }, 2000)

      });
    }

    body.appendChild(div);

    mensagens = (acertou) => {
      //Quando for respondido todas as perguntas
      //É apresentado o resultado final
      if ((data.length) == cont) {
        h2.innerText = `Você acertou ${acertou} de ${data.length}`
        h2.style.marginTop = "10%";
        h2.style.animationName = "animacao";
      }

      return Mensagem.appendChild(h2)

    }
  })

}

//Função para mudar a questão quando for selecionado a resposta
removerPergunta = (cont) => {
  for (i = 0; i <= cont; i++) {

    const perguntaId = document.getElementById(`pergunta_${i}`);
    const questoes = document.querySelector(`.Titulo`)

    //escondendo as questões 
    if (i > cont || i < cont) {
      perguntaId.className = "hide";
      if(i==0){
        questoes.className = "hide"
      }
    } 
    //Impedindo que ocorra um erro ao não ter mais perguntas
    else if (perguntaId == null) {
      console.log("Fim")
    } 
    //Mostrando as respostas 
    else {
      questoes.classList.remove("hide");
      perguntaId.className = "show";
    }
  }
}

getQuestoes()