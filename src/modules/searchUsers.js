import { render } from "./render"
import { debounce } from "./helpers"

export const searchUsers = () => {
    const input = document.getElementById('search-input')

    const debounceSearch = debounce(() => {
        userService.gerSearchUsers(input.value).then(users => {
            render(users)
        }).catch(error => {
            let p = document.getElementById('getError')
            p.textContent = "Произошла ошибка, данных нет!"
            p.style.textAlign = 'center'
            console.log(error.message);
        })
    })

    input.addEventListener('input', debounceSearch)
}