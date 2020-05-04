<template>
  <div class="search-table">
    <div class="search-table__input">
      <!-- SEARCH INPUT -->
      <input class="search-table__input__feild" v-model="value" type="text" placeholder="search in table..." />
      <!-- SEARCH ICONS SEARCH -->
      <div class="search-table__icons search-table__icons--search">
        <svg xmlns="http://www.w3.org/2000/svg" width="50.875" height="50.875">
          <path
            d="M49.475 49.475a4.777 4.777 0 01-6.757 0l-8.432-8.432a22.407 22.407 0 116.757-6.757l8.432 8.432a4.777 4.777 0 010 6.757zM22.3 6.369A15.927 15.927 0 1038.222 22.3 15.926 15.926 0 0022.3 6.369z"
            data-name="search icon"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInputTable',
  props: {
    getData: {
      type: Array,
      required: true
    },
    filterBy: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      value: null
    };
  },
  computed: {
    // FILTER DATA
    filterData() {
      // IF THE VALUE EQUAL FALSE WILL BE RETURN GET DATA
      if (!this.value) return this.getData;

      // FILTER GET DATA
      return this.getData.filter(data => data[this.filterBy].toLowerCase().startsWith(this.value.toLowerCase()));
    }
  },
  watch: {
    // WATCH ON VALUE IF CHANGE WILL BE POST DATA COMPUTED FILTER DATA
    value() {
      this.$emit('postData', this.filterData);
    }
  },
  created() {
    // INIT DATA BEGINING WILL BE RETURN FILTER DATA
    this.$emit('postData', this.filterData);
  }
};
</script>

<style lang="scss">
//
.search-table {
  position: relative;
  width: 30%;
  margin-bottom: 1rem;
  // INPUT
  &__input {
    position: relative;
    border-radius: map-get($border-radius, first);
    overflow: hidden;

    // FEILD
    &__feild {
      width: 100%;
      padding: 1rem 0 1rem 7rem;
      font-size: 20px;
      border: 0;
      color: map-get($color, color-sixth);
      background-color: map-get($background, back-second);
      outline: none;
      appearance: none;
      font-family: inherit;
      font-weight: 300;
    }

    // PLACEHOLDER
    ::placeholder {
      color: map-get($color, color-sixth);
      text-transform: capitalize;
    }
  }

  // ICONS
  &__icons {
    position: absolute;
    top: 0;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-right: 1px solid map-get($background, back-fourth);

    // SEARCH
    &--search {
      background-color: transparent;
      left: 0;
    }

    // SVG
    & svg {
      transform: scale(0.5);
      fill: map-get($background, back-first);
      transition: all 0.3s ease;
    }
  }
}
</style>
