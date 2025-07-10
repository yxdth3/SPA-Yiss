const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "",event.target.href);
    handleLocation();
}
window.route = route;

const routes = {
    404: './src/views/404.html',
    '/': './src/views/index.html',
    '/create': './src/views/create.html',
    '/edit': './src/views/edit.html',
    '/delete': './src/views/delete.html'
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