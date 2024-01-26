const localStorageKey = 'to-do-list-wvs'
let notCheckIco = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
<path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg>`
let checkIco = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>`

function clearField(field) {
    field.style.border = "none"
    field.value = ""
}

function validateIfExistsNewTask()
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById("input-new-task").value
    let exists = values.find(x => x.name == inputValue) // verifica se já existe alguma variável com o mesmo 'name'
    return !exists ? false : true // se nao tiver, retorna false, caso contrario, true
}

function newTask() 
{   // quando aperta btn-new-task
    let input = document.getElementById("input-new-task")
    


    // validação
    if(!input.value)
    {
        input.style.border = "3px solid var(--color-red2)"
        alert(`Empty field. Please, type to add new task.`)
    }
    else if(validateIfExistsNewTask()) 
    {
        input.style.border = "3px solid var(--color-red2)"
        alert("Já existe uma task com essa descrição!")
    }
    else
    {
    // increment to localStorage 
    // so if its repeated, we can check it
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]") 
        // gerar array em cima do que está guardado no local storage
        values.push({
            name: input.value
        }) 
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
        clearField(input)
    }
}

function showValues() 
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ""
    for(let i=0; i < values.length; i++)
    {
        list.innerHTML +=`<li>${values[i]['name']}<button id="btn-ok" onclick="removeItem('${values[i]['name']}')">${notCheckIco}</button></li>`
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)

    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}

showValues() // para que não fique vazio ao recarregar page
