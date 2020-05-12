<template>
  <div class="card-view">
    <!-- CARD VIEW INNER -->
    <div class="card-view__inner">
      <!-- IMAGE -->
      <div class="card-view__image">
        <img :src="require('@/assets/image/image3.jpeg')" alt="" />
      </div>

      <!-- INFO CARD -->
      <div class="card-view__info-card">
        <h2 class="card-view__info-card__title" v-text="title"></h2>
        <!-- INFO CARD DATA -->
        <div class="card-view__info-card__data">
          <span class="card-view__info-card__data__price"><span>&dollar;</span>{{ price }}</span>
          <span class="card-view__info-card__data__discount" v-if="discount" v-text="discount"></span>
          <span class="card-view__info-card__data__quantity">{{ quantity }}</span>
        </div>
        <!-- INFO CARD ACTION -->
        <div class="card-view__info-card__actions">
          <GSvg nameIcon="add"></GSvg>
          <GSvg nameIcon="delete"></GSvg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//
export default {
  name: 'CardView',
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      required: false
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
// CARD VIEW
.card-view {
  position: relative;
  border-radius: map-get($border-radius, first);
  overflow: hidden;
  box-shadow: map-get($shadow, first);

  // IMAGE
  &__image {
    position: absolute;
    @include translate('top', 'left', 0, 0);
    width: 100%;
    height: 100%;

    // IMG
    img {
      width: 100%;
      height: 100%;
      max-height: 100%;
      object-fit: cover;
    }

    // AFTER
    &::after {
      content: '';
      position: absolute;
      @include translate('top', 'left', 0, 0);
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(map-get($background, back-first), 0.8) 40%, rgba(white, 0.3));
    }
  }
  // INNER
  &__inner {
  }
  // INFO CARD
  &__info-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    padding: 1rem;
    @include translate('top', 'left', 0, 0);
    width: 100%;
    height: 100%;
    color: white;
    text-transform: uppercase;

    // TITLE
    &__title {
      font-size: 3rem;
      margin-bottom: auto;
      letter-spacing: 1px;
      font-weight: 300;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    // DATA
    &__data {
      display: flex;
      align-items: center;
      flex-direction: column;
      align-items: flex-start;
      //   justify-content: space-between;

      // PRICE
      &__price {
        font-size: 2.5rem;
      }
      // DISCOUNT
      &__discount {
        font-size: 2rem;
        margin: 0.7rem 0;
        text-decoration: line-through;
      }
      // QUANTITY
      &__quantity {
        font-size: 1.8rem;
      }
    }

    // ACTIONS
    &__actions {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
      background-color: map-get($background, back-ninth);
      padding: 1rem;
      border-radius: map-get($border-radius, first);
      box-shadow: map-get($shadow, third);
      //
      & > * {
        cursor: pointer;
      }
    }
  }
}
</style>
