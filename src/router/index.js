import Vue from 'vue'
import  VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'

// Сообщить Vue, что собираемся использовать vue-router
// Добавим сами маршруты в виде объекта
Vue.use(VueRouter);

// Создадим массив, где будут храниться маршруты
const routes = [
  {name: 'main', component: MainPage, path: '/'},
  {name: 'product', component: ProductPage, path: '/product/:id'},
  {name: 'cart', component: CartPage, path: '/cart'},
  {name: 'notFound', component: NotFoundPage, path: '*'}
];

// Создать новый экземпляр роутера
// Подключим массив с маршрутами к экземпляру роутера
const router = new VueRouter({
  routes
});

// и экспортировать роутер
export default router;