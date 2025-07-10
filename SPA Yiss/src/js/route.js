const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "",event.target.href);
    handleLocation();
}
window.route = route;

const routes = {
    '/' : './src/views/index.html',
    '/register' : './src/views/register.html',
    '/mainPage': './src/views/mainPage.html',
    '/dashboard': './src/views/dashboard.html',
    '/not-found': './src/views/not-found.html'
};


const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then(data => data.text());
    document.getElementById('root').innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();