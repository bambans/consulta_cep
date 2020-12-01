const inputs = document.querySelectorAll('.input_response')
const form_action = ()=>{
	const cep = document.querySelector('#input_cep').value
	if(cep.length == 8){
		via_cep(cep)
	}
	else if(cep.length == 0){
		form_clear()
	}
}
const via_cep = cep_value=>{
	const link_to_fetch = `https://viacep.com.br/ws/${cep_value}/json/`
	document.querySelector('a').setAttribute('href', link_to_fetch)
	document.querySelector('#link').value = link_to_fetch
	fetch(link_to_fetch)
		.then(data => data.json())
		.then(response=>{
			html_cep(response)
		})
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
const html_cep = response=>{
	var responses = [response.cep, response.logradouro, response.complemento, response.bairro, response.localidade, response.uf, response.ibge, response.gia, response.ddd, response.siafi]
	for_propagation(responses, inputs, responses, true)
}
const form_clear = ()=>{
	for_propagation(inputs, inputs, null, false)
	document.querySelector('a').setAttribute('href', 'https://viacep.com.br/')
	document.querySelector('#link').value = 'https://viacep.com.br/'
}
document.querySelector('#input_cep').focus()
document.querySelector('#input_cep').addEventListener('keyup', form_action)