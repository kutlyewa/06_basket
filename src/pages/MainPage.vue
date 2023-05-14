<template>
  <main class="content container">

<div class="content__top content__top--catalog">
  <h1 class="content__title">
    Каталог
  </h1>
  <span class="content__info">
    152 товара
  </span>
</div>

<div class="content__catalog">

  <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :color-id.sync="filterColorId" />

  <section class="catalog">
    <ProductList :products="products" />
    <!-- v-model="page" - текущая страница -->
    <!-- :count="countProducts" - общее кол-во товара -->
    <!-- :per-page="productsPerPage" - кол-во элементов на странице -->
    <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
  </section>

</div>
</main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  
  components: {ProductList, BasePagination, ProductFilter},
  data() {
    return {
      filterPriceFrom: 0, // значение из поля цена от
      filterPriceTo: 0, // значение из поля цена до
      filterCategoryId: 0, // идентификатор выбранной категории
      filterColorId: 0, // идентификатор с выбранным цветом
      page: 1, // текущая страница
      productsPerPage: 3 // количество товаров на стр.
    }
  },
  computed: {
    // новое вычисляемое св-во, возвращающее отфильтрованный список товаров
    filteredProducts() {
      let filteredProducts = products;

      if(this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(product => product.price > this.filterPriceFrom);
      }

      if(this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(product => product.price < this.filterPriceTo);
      }

      if(this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(product => product.categoryId === this.filterCategoryId);
      }

      if(this.filterColorId) {
        filteredProducts = filteredProducts.filter(product => product.color.id === this.filterColorId);
      }

      return filteredProducts;
    },
    // вычисляемое свойство, возвращающее часть товаров в зависимости от настройки пагинации (productsPerPage: 3)
    products() {
      const offset = (this.page - 1) * this.productsPerPage; // Начальный индекс
      return this.filteredProducts.slice(offset, offset + this.productsPerPage); // Конечный индекс
    },
    // вычисляемое свойство, возвращающее общее количество товаров
    countProducts() {
      return this.filteredProducts.length
    }
  }
}
</script>