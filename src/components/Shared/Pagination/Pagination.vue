<template>
  <div class="pagination">
    <!-- PAGINATION BTN PREV -->
    <div class="pagination__btn__prev" v-if="statusPrev" @click="prevBtn">
      <slot name="prev">prev</slot>
    </div>
    <!-- PAGINATION PAGINATOR -->
    <ul class="pagination__paginator">
      <li class="pagination__paginator__pagi" v-if="hasFirstPage" @click="getNumPage(1)">1</li>
      <li class="pagination__paginator__pagi pagination__paginator__pagi--spread" v-if="hasFirstPage">...</li>
      <!--  -->
      <ul class="pagination__paginator__sub">
        <li
          v-for="(page, index) in pages"
          :key="index + 1"
          @click="getNumPage(page)"
          :class="['pagination__paginator__pagi', { 'pagination__paginator__pagi--active': currentPage == page }]"
        >
          {{ page }}
        </li>
      </ul>
      <li class="pagination__paginator__pagi pagination__paginator__pagi--spread" v-if="hasLastPage">...</li>
      <li class="pagination__paginator__pagi" v-if="hasLastPage" @click="getNumPage(totalPages)">{{ totalPages }}</li>
    </ul>
    <!-- PAGINATION BTN NEXT -->
    <div class="pagination__btn__next" v-if="statusNext" @click="nextBtn">
      <slot name="next">next</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: [String, Number],
      default: 1
    },
    total: {
      type: Number,
      required: true
    },
    pageRang: {
      type: Number,
      default: 2
    },
    perPage: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {};
  },
  computed: {
    // CONVERT CURRENT TO NUMBER
    convertCurrentToNumber() {
      return parseInt(this.currentPage);
    },
    // PAGES
    pages() {
      let page = [];
      //
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        page.push(i);
      }
      // RETURN PAGE
      return page;
    },
    // RANGE START
    rangeStart() {
      //
      const start = this.convertCurrentToNumber - this.pageRang;
      //
      return start > 0 ? start : 1;
    },
    // RANGE END
    rangeEnd() {
      //
      const end = this.convertCurrentToNumber + this.pageRang;
      //
      return end < this.totalPages ? end : this.totalPages;
    },
    // HAS FIRST PAGE
    hasFirstPage() {
      return this.rangeStart !== 1;
    },
    // HAS LAST PAGE
    hasLastPage() {
      return this.rangeEnd < this.totalPages;
    },
    // STATUS NEXT
    statusNext() {
      return this.convertCurrentToNumber < this.totalPages;
    },
    // STATUS PREV
    statusPrev() {
      return this.convertCurrentToNumber > 1;
    },
    // TOTAL PAGES
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    }
  },
  methods: {
    // NEXT BTN
    nextBtn() {
      return this.getNumPage(this.convertCurrentToNumber + 1);
    },
    // PREV BTN
    prevBtn() {
      return this.getNumPage(this.convertCurrentToNumber - 1);
    },
    // GET NUM PAGE
    getNumPage(page) {
      return this.$emit('changePage', page);
    }
  }
};
</script>

<style lang="scss">
// PAGINATION
.pagination {
  position: absolute;
  display: flex;
  justify-content: center;
  @include translate('bottom', 'left', 10%, 50%);

  // UL
  & ul {
    display: flex;
    list-style: none;
  }

  // PAGINATOR
  &__paginator {
    list-style: none;
    font-size: 1.6rem;

    // PAGI
    &__pagi {
      padding: 1.5rem 2rem;
      background-color: transparent;
      color: map-get($color, color-third);
      border-radius: map-get($border-radius, first);
      border: 1px solid map-get($background, back-fifth);
      font-weight: 300;
      user-select: none;
      transition: all 0.2s ease;
      cursor: pointer;

      // ACTIVE AND HOVER
      &--active,
      &:hover {
        background-color: map-get($background, back-first);
        color: map-get($color, color-first);
        box-shadow: map-get($shadow, first);
      }

      // AND NEW PROPERTY ACTIVE
      &--active {
        font-weight: 400;
      }

      // SPREAD
      &--spread {
        margin: 0 1rem;
        border: 0;
        color: map-get($color, color-third);
        cursor: default;

        // HOVER
        &:hover {
          background-color: transparent;
          color: currentColor;
          box-shadow: none;
        }
      }
    }

    // SUB
    &__sub {
      // NOT FIRST OF TYPE
      & li:not(:first-of-type) {
        margin-left: 1rem;
      }
    }
  }

  // BTN PREV
  &__btn__prev {
    margin-right: 3rem;
  }
  // BTN NEXT
  &__btn__next {
    margin-left: 3rem;
  }
  // BTN PREV AND BTN NEXT
  &__btn__prev,
  &__btn__next {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    background-color: map-get($background, back-second);
    border-radius: map-get($border-radius, first);
    border: 0.5px solid transparent;
    user-select: none;
    transition: border 0.2s;
    cursor: pointer;

    // HOVER
    &:hover {
      border-color: map-get($background, back-sixth);
    }
  }
}
</style>
