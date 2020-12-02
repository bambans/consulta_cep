const inputs = document.querySelectorAll('.input_response')
const cep = document.querySelector('#input_cep')
const init = () => {
	cep_validation()
	cep.focus()
}
const cep_validation = () => cep.addEventListener('keyup', event=>{
	var cep_valid = cep.value.replace(/\D/g, '')
	if(cep.length == 0 || cep_valid.length == 0){
		form_clear()
	}
	else if(cep_valid.length == 8){
		via_cep(cep_valid)
	}
})
const via_cep = cep_value=>{
	const link_to_fetch = `https://viacep.com.br/ws/${cep_value}/json/`
	fetch(link_to_fetch)
		.then(data => data.json())
		.then(response=>{
			cep.value = response.cep
			document.querySelector('a').setAttribute('href', link_to_fetch)
			document.querySelector('#link').value = link_to_fetch
			put_in_html(response)
		})
		.catch(error=>{
			error ? form_clear() : false
		})
}
const put_in_html = response=>{
	if(response.erro){
		window.location.reload()
	}
	else{
		var responses = [response.cep, response.logradouro, response.complemento, response.bairro, response.localidade, response.uf, response.ibge, response.gia, response.ddd, response.siafi]
		for_propagation(responses, inputs, responses, true)
	}
}
const for_propagation = (for_array, array_value_recieve, values, values_in_loop)=>{
	values_in_loop ? result_values = 'values[i]' : result_values = 'values'
	for(i=0; i<=for_array.length - 1; i++){
		array_value_recieve[i].value = eval(result_values)
	}
}
const form_clear = ()=>{
	for_propagation(inputs, inputs, null, false)
	cep.value = null
	document.querySelector('a').setAttribute('href', 'https://viacep.com.br/')
	document.querySelector('#link').value = 'https://viacep.com.br/'
}
window.onload = init()