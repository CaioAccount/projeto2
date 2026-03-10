let historico = JSON.parse(localStorage.getItem("historico")) || []
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []
let ultimoResultado = ""

async function converter(){

let valor = parseFloat(document.getElementById("valor").value)
let tipo = document.getElementById("tipo").value
let resultado = 0
let unidade = ""

if(isNaN(valor)){
document.getElementById("resultado").innerText="Digite um número válido"
return
}

switch(tipo){

case "c_f":
resultado=(valor*9/5)+32
unidade="°F"
break

case "f_c":
resultado=(valor-32)*5/9
unidade="°C"
break

case "c_k":
resultado=valor+273.15
unidade="K"
break

case "k_c":
resultado=valor-273.15
unidade="°C"
break

case "km_mi":
resultado=valor*0.621371
unidade="milhas"
break

case "mi_km":
resultado=valor/0.621371
unidade="km"
break

case "m_cm":
resultado=valor*100
unidade="cm"
break

case "cm_m":
resultado=valor/100
unidade="m"
break

case "m_ft":
resultado=valor*3.28084
unidade="ft"
break

case "ft_m":
resultado=valor/3.28084
unidade="m"
break

case "kg_lb":
resultado=valor*2.20462
unidade="lb"
break

case "lb_kg":
resultado=valor/2.20462
unidade="kg"
break

case "kg_g":
resultado=valor*1000
unidade="g"
break

case "g_kg":
resultado=valor/1000
unidade="kg"
break

case "mb_gb":
resultado=valor/1024
unidade="GB"
break

case "gb_mb":
resultado=valor*1024
unidade="MB"
break

case "gb_tb":
resultado=valor/1024
unidade="TB"
break

case "tb_gb":
resultado=valor*1024
unidade="GB"
break

case "min_h":
resultado=valor/60
unidade="horas"
break

case "h_min":
resultado=valor*60
unidade="minutos"
break

case "h_s":
resultado=valor*3600
unidade="segundos"
break

case "s_h":
resultado=valor/3600
unidade="horas"
break

case "brl_usd":

try{

let dados1=await fetch("https://api.exchangerate-api.com/v4/latest/BRL")
let json1=await dados1.json()

resultado=valor*json1.rates.USD
unidade="USD"

}catch{

document.getElementById("resultado").innerText="Erro ao buscar câmbio"
return

}

break

case "usd_brl":

try{

let dados2=await fetch("https://api.exchangerate-api.com/v4/latest/USD")
let json2=await dados2.json()

resultado=valor*json2.rates.BRL
unidade="BRL"

}catch{

document.getElementById("resultado").innerText="Erro ao buscar câmbio"
return

}

break

}

let texto=valor+" → "+resultado.toFixed(2)+" "+unidade
ultimoResultado=texto

document.getElementById("resultado").innerText="Resultado: "+resultado.toFixed(2)+" "+unidade

salvarHistorico(texto)

}

function salvarHistorico(texto){

historico.unshift(texto)

if(historico.length>8){
historico.pop()
}

localStorage.setItem("historico",JSON.stringify(historico))

mostrarHistorico()

}

function mostrarHistorico(){

let lista=""

historico.forEach(item=>{
lista+=`<div class="historico-item">${item}</div>`
})

document.getElementById("historico").innerHTML=lista

}

function limparHistorico(){

historico=[]
localStorage.removeItem("historico")
mostrarHistorico()

}

function favoritar(){

if(ultimoResultado==="") return

favoritos.unshift(ultimoResultado)

if(favoritos.length>6){
favoritos.pop()
}

localStorage.setItem("favoritos",JSON.stringify(favoritos))

mostrarFavoritos()

}

function mostrarFavoritos(){

let lista=""

favoritos.forEach((item,index)=>{
lista+=`
<div class="favorito-item">
⭐ ${item}
<button class="remover" onclick="removerFavorito(${index})">❌</button>
</div>
`
})

document.getElementById("favoritos").innerHTML=lista

}

function removerFavorito(index){

favoritos.splice(index,1)

localStorage.setItem("favoritos",JSON.stringify(favoritos))

mostrarFavoritos()

}

function inverter(){

let tipo=document.getElementById("tipo")

let partes=tipo.value.split("_")

tipo.value=partes[1]+"_"+partes[0]

}

function alternarTema(){

document.body.classList.toggle("claro")

}

document.getElementById("valor").addEventListener("keypress",function(e){

if(e.key==="Enter"){
converter()
}

})

mostrarHistorico()
mostrarFavoritos()