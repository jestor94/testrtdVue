import Sign from '../pages/Sign.vue'
import Films from '../pages/Films.vue'

const routes = [
    { path: '/', name: 'Login to films', component: Sign },
    { path: '/films', name: 'Films list', component: Films },

];

export default routes;