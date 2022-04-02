// console.log("Olá mundo!");
// document.write("Nome");
// document.writeln("Olá mundo!");

// let numero1 = +prompt("Digite um número inteiro: ");
// let numero2 = +prompt("Digite um número inteiro: "); // o + substitui o parseInt()

// let soma = numero1 + numero2;

// document.write(numero1 + " + " + numero2 + " = " + soma);

const body = document.querySelector("body");
console.log(body);

let ul = document.createElement("ul");

let carros = ["Impala", "Marea Turbo", "Opala", "Gol Quadrado", "Vectra", "Escort", "Karmann Ghia"];

for (let i = 0; i < carros.length; i++) { 
    let li = document.createElement("li")
    li.setAttribute('id', 'carro-' + (i + 1));
    li.setAttribute('class', 'carro');
    li.setAttribute('title', carros[i]);
    li.innerText = carros[i];
    ul.appendChild(li);    
}
body.appendChild(ul);