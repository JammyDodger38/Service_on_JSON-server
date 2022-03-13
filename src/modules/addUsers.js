import { render } from "./render"

export const addUsers = () => {
    const form = document.querySelector('form')
    const nameInput = document.getElementById('form-name')
    const emailInput = document.getElementById('form-email')
    const childrenInput = form.querySelector('#form-children')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!form.dataset.method) {
            const user = {
                name: nameInput.value,
                email: emailInput.value,
                children: childrenInput.checked,
                permissions: false
            }
    
            userService.addUser(user).then(res => {
                userService.getUsers().then(users => {
                    render(users)
                    form.reset()
                })
            }).catch(error => alert("Ошибка: " + error.message))
        }
    })
}