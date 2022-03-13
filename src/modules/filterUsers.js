import { render } from "./render"

export const filterUsers = () => {
    const btnIsChildren = document.getElementById('btn-isChildren')
    const btnIsPermissions = document.getElementById('btn-isPermissions')
    const btnIsAll = document.getElementById('btn-isAll')

    btnIsChildren.addEventListener('click', () => {
        userService.filterUsers('children').then(users => {
            let p = document.getElementById('getError')
            p.textContent = ''
            render(users);
        }).catch(error => {
            let p = document.getElementById('getError')
            p.textContent = "Произошла ошибка, данных нет!"
            p.style.textAlign = 'center'
            console.log(error.message);
        })
    })

    btnIsPermissions.addEventListener('click', () => {
        userService.filterUsers('permissions').then(users => {
            let p = document.getElementById('getError')
            p.textContent = ''
            render(users);
        }).catch(error => {
            let p = document.getElementById('getError')
            p.textContent = "Произошла ошибка, данных нет!"
            p.style.textAlign = 'center'
            console.log(error.message);
        })
    })

    btnIsAll.addEventListener('click', () => {
        userService.getUsers().then(users => {
            let p = document.getElementById('getError')
            p.textContent = ''
            render(users);
        }).catch(error => {
            let p = document.getElementById('getError')
            p.textContent = "Произошла ошибка, данных нет!"
            p.style.textAlign = 'center'
            console.log(error.message);
        })
    })
}