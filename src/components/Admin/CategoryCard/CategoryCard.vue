<template>
  <ul class="category-page__all-category">
    <li
      :class="[
        'category-page__all-category__category',
        {
          'category-page__all-category__category--active-narrow': currentIndex == index && statusOpenClose,
          'category-page__all-category__category--active-wide': currentIndex == index && statusOpenClose && statusAside,
          'category-page__all-category__category--notShow': currentIndex !== index && statusOpacity
        }
      ]"
      v-for="(category, index) in allCategory"
      :key="index"
      @click="!statusOpenClose ? loadProductsInCategory(index, category) : true"
    >
      <!-- INFO -->
      <div class="category-page__all-category__category__info">
        <!-- FOLDER -->
        <div class="category-page__all-category__category__icon-folder" v-if="!statusOpenClose">
          <GSvg nameIcon="folder"></GSvg>
        </div>
        <!-- TITLE -->
        <h3 class="category-page__all-category__category__title">{{ category }}</h3>
      </div>
      <!-- ACTIONS -->
      <div class="category-page__all-category__category__actions">
        <!-- DELETE -->
        <div class="category-page__all-category__category__icon-delete" @click.stop="deleteCategory(category)" v-if="!statusOpenClose">
          <GSvg nameIcon="delete" title="delete icon"></GSvg>
        </div>
        <!-- EDIT -->
        <div class="category-page__all-category__category__icon-edit" @click.stop="sendNameCategory(category)" v-if="!statusOpenClose">
          <GSvg nameIcon="edit" title="edit icon"></GSvg>
        </div>
      </div>
      <!-- WRONG -->
      <div class="category-page__all-category__category__icon-close" @click.stop="closeCategory">
        <GSvg nameIcon="wrong" title="close icon"></GSvg>
      </div>
      <!-- RENDER ALL PRODUCTS -->
      <ul class="category-page__all-category__renderProducts" v-if="statusOpenClose">
        <slot name="renderProducts"> </slot>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    allCategory: {
      type: Array
    }
  },
  data() {
    return {
      currentIndex: null,
      statusOpenClose: false,
      statusOpacity: false
    };
  },
  computed: {
    // STATUS ASIDE
    statusAside() {
      return this.$store.state.Admin.statusAside;
    }
  },
  methods: {
    // CATEGORY OPEN
    loadProductsInCategory(index, nameCategory) {
      this.currentIndex = index;
      this.statusOpenClose = true;
      this.$emit('opnedCategory', nameCategory);
      this.$emit('statusOpenCloseCategory', this.statusOpenClose);
    },
    // CLOSE CATEGORY
    closeCategory() {
      this.currentIndex = null;
      this.statusOpenClose = false;
      this.$emit('statusOpenCloseCategory', this.statusOpenClose);
    },
    // SEND NAME CATEGORY
    sendNameCategory(nameCategory) {
      return this.$emit('editCategory', nameCategory);
    },
    //
    deleteCategory(nameCategory) {
      return this.$emit('deleteCategory', nameCategory);
    }
  },
  watch: {
    // CURRENT INDEX
    currentIndex(n) {
      if (n || n == 0) {
        this.statusOpacity = true;
      } else {
        setTimeout(() => {
          this.statusOpacity = false;
        }, 200);
      }
    }
  }
};
</script>

<style lang="scss">
// CATEGORY PAGE ALL CATEGORY
.category-page__all-category {
  list-style: none;

  // CATEGORY
  &__category {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
    height: 90px;
    background-color: map-get($background, back-first);
    color: map-get($color, color-first);
    padding: 0.7rem;
    font-size: 2rem;
    text-transform: capitalize;
    border-radius: map-get($border-radius, first);
    transition: width 0.4s, opacity 0.2s, height 0.4s, box-shadow 0.5s;
    cursor: pointer;

    // INFO AND ACTIONS
    &__info,
    &__actions {
      display: flex;
    }
    // INFO
    &__info {
      align-items: center;
    }
    // ACTIONS
    &__actions {
      justify-content: space-between;
      align-items: center;
    }

    // TITLE
    &__title {
      font-size: 2rem;
      font-weight: 400;
    }

    // ACTIVE NARROW
    &--active-narrow {
      position: absolute;
      @include translate('top', 'left', 0, 0);
      width: 79vw;
      height: 78vh;

      // RESPONSIVE
      @include respond(1336px) {
        width: 78vw;
      }

      // TITLE
      [class$='__title'] {
        position: absolute;
        @include translate('top', 'left', 5%, 5%);
        width: 90%;

        // AFTER
        &::after {
          content: '';
          position: absolute;
          @include translate('bottom', 'left', -10px, 0);
          width: 100%;
          height: 0.5px;
          background-color: map-get($background, back-second);
        }
      }

      // ICON CLOSE
      [class$='__icon-close'] {
        position: absolute;
        display: block;
        opacity: 1;
        @include translate('top', 'right', 5%, 5%);
      }
      // ICON DELETE AND ICON FOLDER
      [class$='__icon-delete'],
      [class$='__icon-folder'],
      [class$='__icon-edit'] {
        opacity: 0;
      }
    }

    // ACTIVE WIDE
    &--active-wide {
      width: 93vw;

      // RESPONSIVE
      @include respond(700px) {
        width: 90vw;
      }
    }

    // NOT SHOW
    &--notShow {
      opacity: 0;
      pointer-events: none;
    }

    //
    &__icon-folder {
    }
    //
    &__icon-edit,
    &__icon-delete {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      transition: background-color 0.5s;
      //
      &:hover {
        background-color: map-get($background, back-tenth);
      }
    }
    //
    &__icon-delete {
    }
    //
    &__icon-close {
      display: none;
      opacity: 0;
    }

    // HOVER
    &:hover {
      box-shadow: map-get($shadow, first);
    }
  }
  // RENDER PRODUCTS
  &__renderProducts {
    position: relative;
    list-style: none;
    height: 100%;
    max-width: 100%;
    width: 91%;
    margin: 70px auto;
    margin-bottom: 0px;
    overflow: auto;
    //
    & li {
      background-color: rgb(71, 71, 201);
      padding: 10px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 1.5rem;
      &:not(:last-of-type) {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
