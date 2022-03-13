import { render } from "./modules/render";
import { UserService } from "./modules/userService"
import { addUsers } from "./modules/addUsers"
import { removeUsers } from "./modules/removeUsers"
import { changePermissions } from "./modules/changePermissions"
import { editUsers } from "./modules/editUsers"
import { filterUsers } from "./modules/filterUsers"
import { sortUsers } from "./modules/sortUsers"
import { searchUsers } from "./modules/searchUsers"

window.userService = new UserService

userService.getUsers().then(data => {
    let p = document.getElementById('getError')
    p.textContent = ''
    render(data)
}).catch(error => {
    let p = document.getElementById('getError')
    p.textContent = "Произошла ошибка, данных нет!"
    p.style.textAlign = 'center'
    console.log(error.message);
})

addUsers()
removeUsers()
changePermissions()
editUsers()
filterUsers()
sortUsers()
searchUsers()