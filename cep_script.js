const inputs = document.querySelectorAll('.input_response')
const form_action = ()=>{
	var cep = document.querySelector('#input_cep').value
	if(!isNaN(cep)){
		if(cep.length == 8){
			via_cep(cep)
		}
		else if(cep.length == 0){
			form_clear()
		}
	}
	else{
		document.querySelector('#input_cep').value = null
	}
}
const via_cep = cep_value=>{
	const link_to_fetch = `https://viacep.com.br/ws/${cep_value}/json/`
	document.querySelector('a').setAttribute('href', link_to_fetch)
	document.querySelector('#link').value = link_to_fetch
	fecthing(link_to_fetch)
}
const fecthing = link_to_fetch =>{
	fetch(link_to_fetch)
		.then(data => data.json())
		.then(response=>{
			html_cep(response)
		})
		.catch(error=>{
			console.table(error)
		})
}
const html_cep = response=>{
	var responses = [response.cep, response.logradouro, response.complemento, response.bairro, response.localidade, response.uf, response.ibge, response.gia, response.ddd, response.siafi]
	for_propagation(responses, inputs, responses, true)
}
const form_clear = ()=>{
	for_propagation(inputs, inputs, null, false)
	document.querySelector('#input_cep').value = null
	document.querySelector('a').setAttribute('href', 'https://viacep.com.br/')
	document.querySelector('#link').value = 'https://viacep.com.br/'
}
const for_propagation = (for_array, array_value_recieve, values, values_in_loop)=>{
	if(values_in_loop){
		for(i=0; i<=for_array.length - 1; i++){
			array_value_recieve[i].value = values[i]
		}
	}
	else{
		for(i=0; i<=for_array.length - 1; i++){
			array_value_recieve[i].value = values
		}
	}
}
const keyboard_check = () => {
	document.querySelector('#input_cep').addEventListener('keyup', event=>{
		var key = event.which || event.keyCode || event.key;
		var reg = new RegExp('/[0-9]/')
		if(key == reg){
			form_clear()
		}
		else if(key == 27){
			form_clear()
		}
		else{
			form_action()
		}
	})
}
const init = ()=>{
	keyboard_check()
}
window.onload = init()