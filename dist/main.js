(()=>{"use strict";const e=e=>{const t=document.getElementById("table-body");t.innerHTML="",e.forEach((e=>{t.insertAdjacentHTML("beforeend",`\n            <tr data-key="${e.id}">\n                <th scope="row">${e.id}</th>\n                <td>${e.name}</td>\n                <td>${e.email}</td>\n                <td>${e.children?"Есть":"Нет"}</td>\n                <td>\n                    <div class="form-check form-switch">\n                        <input class="form-check-input" type="checkbox" role="switch"\n                            id="form-children" ${e.permissions?"checked":""}>\n                    </div>\n                </td>\n                <td>\n                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">\n                        <button type="button" class="btn btn-warning btn-edit">\n                            <i class="bi-pencil-square"></i>\n                        </button>\n                        <button type="button" class="btn btn-danger btn-remove">\n                            <i class="bi-person-x"></i>\n                        </button>\n                    </div>\n                </td>\n            </tr>\n        `)}))};window.userService=new class{async getData(e){return await fetch(e).then((e=>{if(e.ok)return e.json();throw new Error(e.status)}))}async setData(e,t,r){return"POST"==t||"PATCH"==t||"PUT"==t?await fetch(e,{method:t,headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then((e=>{if(e.ok)return e.json();throw new Error(e.status)})):"DELETE"==t?fetch(e,{method:"DELETE"}).then((e=>{if(e.ok)return e.json();throw new Error(e.status)})):void alert("Запроса такого типа не предусмотрено!")}getUsers(){return this.getData("http://localhost:4545/users")}addUser(e){return this.setData("http://localhost:4545/users","POST",e)}removeUser(e){return this.setData(`http://localhost:4545/users/${e}`,"DELETE")}changeUser(e,t){return this.setData(`http://localhost:4545/users/${e}`,"PATCH",t)}getUser(e){return this.getData(`http://localhost:4545/users/${e}`)}editUser(e,t){return this.setData(`http://localhost:4545/users/${e}`,"PUT",t)}filterUsers(e){return this.getData(`http://localhost:4545/users?${e}=true`)}getSortUsers(e){return this.getData(`http://localhost:4545/users?_sort=${e.name}&_order=${e.value}`)}gerSearchUsers(e){return this.getData(`http://localhost:4545/users?name_like=${e}`)}},userService.getUsers().then((t=>{document.getElementById("getError").textContent="",e(t)})).catch((e=>{let t=document.getElementById("getError");t.textContent="Произошла ошибка, данных нет!",t.style.textAlign="center",console.log(e.message)})),(()=>{const t=document.querySelector("form"),r=document.getElementById("form-name"),n=document.getElementById("form-email"),s=t.querySelector("#form-children");t.addEventListener("submit",(o=>{if(o.preventDefault(),!t.dataset.method){const o={name:r.value,email:n.value,children:s.checked,permissions:!1};userService.addUser(o).then((r=>{userService.getUsers().then((r=>{e(r),t.reset()}))})).catch((e=>alert("Ошибка: "+e.message)))}}))})(),document.getElementById("table-body").addEventListener("click",(t=>{if(t.target.closest(".btn-remove")){const r=t.target.closest("tr").dataset.key;userService.removeUser(r).then((t=>{userService.getUsers().then((t=>{e(t)}))})).catch((e=>alert("Ошибка: "+e.message)))}})),document.getElementById("table-body").addEventListener("click",(e=>{if(e.target.closest("input[type=checkbox]")){const t=e.target.closest("tr"),r=t.querySelector("input[type=checkbox]"),n=t.dataset.key;userService.changeUser(n,{permissions:r.checked}).then((e=>{userService.getUsers().then((e=>{render(e)})).catch((e=>alert("Ошибка: "+e.message)))}))}})),(()=>{const t=document.getElementById("table-body"),r=document.querySelector("form"),n=document.getElementById("form-name"),s=document.getElementById("form-email"),o=r.querySelector("#form-children");t.addEventListener("click",(e=>{if(e.target.closest(".btn-edit")){const t=e.target.closest("tr").dataset.key;userService.getUser(t).then((e=>{n.value=e.name,s.value=e.email,o.checked=e.children,r.dataset.method=t}))}})),r.addEventListener("submit",(t=>{if(t.preventDefault(),r.dataset.method){const t=r.dataset.method,c={name:n.value,email:s.value,children:o.checked,permissions:!1};userService.editUser(t,c).then((t=>{userService.getUsers().then((t=>{e(t),r.reset(),r.removeAttribute("data-method")}))})).catch((e=>alert("Ошибка: "+e.message)))}}))})(),(()=>{const t=document.getElementById("btn-isChildren"),r=document.getElementById("btn-isPermissions"),n=document.getElementById("btn-isAll");t.addEventListener("click",(()=>{userService.filterUsers("children").then((t=>{document.getElementById("getError").textContent="",e(t)})).catch((e=>{let t=document.getElementById("getError");t.textContent="Произошла ошибка, данных нет!",t.style.textAlign="center",console.log(e.message)}))})),r.addEventListener("click",(()=>{userService.filterUsers("permissions").then((t=>{document.getElementById("getError").textContent="",e(t)})).catch((e=>{let t=document.getElementById("getError");t.textContent="Произошла ошибка, данных нет!",t.style.textAlign="center",console.log(e.message)}))})),n.addEventListener("click",(()=>{userService.getUsers().then((t=>{document.getElementById("getError").textContent="",e(t)})).catch((e=>{let t=document.getElementById("getError");t.textContent="Произошла ошибка, данных нет!",t.style.textAlign="center",console.log(e.message)}))}))})(),(()=>{const t=document.querySelector("#sort-is-children");let r=!1;t.style.cursor="pointer",t.addEventListener("click",(()=>{userService.getSortUsers({name:"children",value:r?"asc":"desc"}).then((t=>{e(t)})),r=!r}))})(),(()=>{const t=document.getElementById("search-input"),r=((e,t=300)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout((()=>{e.apply(void 0,n)}),t)}})((()=>{userService.gerSearchUsers(t.value).then((t=>{e(t)})).catch((e=>{let t=document.getElementById("getError");t.textContent="Произошла ошибка, данных нет!",t.style.textAlign="center",console.log(e.message)}))}));t.addEventListener("input",r)})()})();