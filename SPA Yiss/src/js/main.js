
console.log('click');

const form = document.querySelector('#loginForm')
form.addEventListener('submit',async (e) => {
    e.preventDefault()
    const data = new FormData(form)
    const username = data.get('username')
    const password = data.get('password')
     
    console.log({username},{password});

    const users = await fetch('http://localhost:3000/users')
    const data_users = await users.json()
    const res = data_users.find(user => user.username == username)

    console.log(res);
});