<template>
  <section class="home-page">
    <!-- START CARD OVERVIEW -->
    <card-overview :countCategory="getAllCategory || 0"></card-overview>
    <!-- END CARD OVERVIEW -->
  </section>
</template>

<script>
//
import CardOverview from '@/components/Admin/CardOverview/CardOverview';
import * as Type from '@/store/Type/index';
//
export default {
  name: 'Home',
  data() {
    return {};
  },
  computed: {
    // GET ALL CATEGORY
    getAllCategory() {
      return this.$store.state.Admin.allCategory.length;
    }
  },
  components: {
    CardOverview
  },
  created() {
    if (this.getAllCategory == 0) {
      this.$store.dispatch(Type.GET_ALL_CATEGORY_FROM_DATABASE);
    }
  }
};
</script>

<style lang="scss">
// HOME PAGE
.home-page {
  text-transform: capitalize;
  margin-top: 1rem;

  // CARD OVERVIEW BOX
  &__card-overview-box {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    grid-area: start-card / start-card / end-card / end-all;

    // RESPONSIVE
    @include respond(1000px) {
      flex-direction: column;
      justify-content: space-around;
      grid-area: start-card / start-card / end-chart / end-card;
    }
  }

  // CARD OVERVIEW
  &__card-overview {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(to right, map-get($background, back-first) 60%, map-get($background, back-seventh));
    padding: 15px 10px;
    color: map-get($color, color-first);
    border-radius: map-get($border-radius, third);
    box-shadow: map-get($shadow, first);
    flex-basis: calc(95% / 4);

    // RESPONSIVE
    @include respond(1000px) {
      //
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }

    // INFO
    &__info {
      padding: 5px;

      // TITLE
      &__title {
        font-size: 1.9rem;
        padding: 1rem 1.5rem;
        border-radius: map-get($border-radius, second);
        background-color: map-get($background, back-ninth);
        box-shadow: map-get($shadow, third);
        font-weight: 400;
        letter-spacing: 1px;
      }
      // ITEM
      &__item {
        font-size: 2.2rem;
        margin: 0.7rem 0;
        letter-spacing: 1.5px;
        font-weight: 300;
      }
      // ACTION
      &__action {
        font-size: 3rem;
        letter-spacing: 1.5px;

        // SPAN
        & > span {
          font-size: 1.1em;
          font-weight: 300;
        }
      }
    }

    // ICON
    &__icon {
    }
  }
}
</style>
