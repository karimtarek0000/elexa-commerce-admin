<template>
  <div class="home-page__card-overview-box">
    <!-- START CARD OVERVIEW BOX -->
    <div class="home-page__card-overview home-page__card-overview--total-sales">
      <!-- CARD OVERVIEW INFO -->
      <div class="home-page__card-overview__info">
        <h2 class="home-page__card-overview__info__title">total sales</h2>
        <h3 class="home-page__card-overview__info__item">items</h3>
        <h4 class="home-page__card-overview__info__action"><span>&dollar;</span> {{ totalSales }}</h4>
      </div>
      <!-- CARD OVERVIEW ICON -->
      <div class="home-page__card-overview__icon">
        <GSvg nameIcon="total-sales"></GSvg>
      </div>
    </div>
    <!-- END CARD OVERVIEW BOX -->

    <!-- START CARD OVERVIEW BOX -->
    <div class="home-page__card-overview home-page__card-overview--total-price-item">
      <!-- CARD OVERVIEW INFO -->
      <div class="home-page__card-overview__info">
        <h2 class="home-page__card-overview__info__title">total price</h2>
        <h3 class="home-page__card-overview__info__item">items</h3>
        <h4 class="home-page__card-overview__info__action"><span>&dollar;</span> {{ totalPrice }}</h4>
      </div>
      <!-- CARD OVERVIEW ICON -->
      <div class="home-page__card-overview__icon">
        <GSvg nameIcon="total-price-item"></GSvg>
      </div>
    </div>
    <!-- END CARD OVERVIEW BOX -->

    <!-- START CARD OVERVIEW BOX -->
    <div class="home-page__card-overview home-page__card-overview--total-count-item">
      <!-- CARD OVERVIEW INFO -->
      <div class="home-page__card-overview__info">
        <h2 class="home-page__card-overview__info__title">count</h2>
        <h3 class="home-page__card-overview__info__item">items</h3>
        <h4 class="home-page__card-overview__info__action" v-text="countItems"></h4>
      </div>
      <!-- CARD OVERVIEW ICON -->
      <div class="home-page__card-overview__icon">
        <GSvg nameIcon="product"></GSvg>
      </div>
    </div>
    <!-- END CARD OVERVIEW BOX -->

    <!-- START CARD OVERVIEW BOX -->
    <div class="home-page__card-overview home-page__card-overview--total-count-category">
      <!-- CARD OVERVIEW INFO -->
      <div class="home-page__card-overview__info">
        <h2 class="home-page__card-overview__info__title">count</h2>
        <h3 class="home-page__card-overview__info__item">category</h3>
        <h4 class="home-page__card-overview__info__action" v-text="countCategory"></h4>
      </div>
      <!-- CARD OVERVIEW ICON -->
      <div class="home-page__card-overview__icon">
        <GSvg nameIcon="category"></GSvg>
      </div>
    </div>
    <!-- END CARD OVERVIEW BOX -->
  </div>
</template>

<script>
export default {
  name: 'CardOverview',
  props: {
    totalSales: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      default: 0
    },
    countItems: {
      type: Number,
      default: 0
    },
    countCategory: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style></style>
