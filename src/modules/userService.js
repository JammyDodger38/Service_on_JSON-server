export class UserService {
    async getData(url) {
        
        return await fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error(res.status)
                }
            })
    }

    async setData(url, type, data) {
        if( type == 'POST' || type == 'PATCH' || type == 'PUT') {
            return await fetch(url, {
                method: type,
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error(res.status)
                }
            })
        } else if (type == 'DELETE') {
            return fetch(url, {
                method: 'DELETE'
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error(res.status)
                }
            })
        } else {
            alert ("Запроса такого типа не предусмотрено!")
        }
    }

    getUsers() {
        return this.getData("http://localhost:4545/users")
    }

    addUser(user) {
        return this.setData("http://localhost:4545/users", "POST", user)
    }

    removeUser(id) {
        return this.setData(`http://localhost:4545/users/${id}`, "DELETE")
    }

    changeUser(id, data) {
        return this.setData(`http://localhost:4545/users/${id}`, "PATCH", data)
    }

    getUser(id) {
        return this.getData(`http://localhost:4545/users/${id}`)
    }

    editUser(id, user) {
        return this.setData(`http://localhost:4545/users/${id}`, "PUT", user)
    }

    filterUsers(filterOption) {
        return this.getData(`http://localhost:4545/users?${filterOption}=true`)
    }

    getSortUsers(sortOption) {
        return this.getData(`http://localhost:4545/users?_sort=${sortOption.name}&_order=${sortOption.value}`)
    }

    gerSearchUsers(str) {
        return this.getData(`http://localhost:4545/users?name_like=${str}`)
    }
}