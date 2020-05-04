<template>
  <section class="home-page">
    <!-- START CARD OVERVIEW -->
    <card-overview></card-overview>
    <!-- END CARD OVERVIEW -->
  </section>
</template>

<script>
//
import CardOverview from '@/components/Admin/CardOverview/CardOverview';
//
export default {
  name: 'Home',
  data() {
    return {};
  },
  components: {
    CardOverview
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
    justify-content: space-around;

    // ALL DIRECT
    & > * {
      flex: 0 1 calc(95% / 4);
    }
  }

  // CARD OVERVIEW
  &__card-overview {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(to right, map-get($background, back-first) 60%, map-get($background, back-seventh));
    padding: 15px 10px;
    color: white;
    border-radius: map-get($border-radius, third);
    box-shadow: map-get($shadow, first);

    // INFO
    &__info {
      padding: 5px;

      // TITLE
      &__title {
        font-size: 2.3rem;
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
