<template>
  <div class="search-table">
    <div class="search-table__input">
      <!-- SEARCH INPUT -->
      <input class="search-table__input__feild" v-model="value" type="text" :placeholder="placeholder" />
      <!-- SEARCH ICONS SEARCH -->
      <div class="search-table__icons search-table__icons--search">
        <svg xmlns="http://www.w3.org/2000/svg" width="50.875" height="50.875">
          <path
            d="M49.475 49.475a4.777 4.777 0 01-6.757 0l-8.432-8.432a22.407 22.407 0 116.757-6.757l8.432 8.432a4.777 4.777 0 010 6.757zM22.3 6.369A15.927 15.927 0 1038.222 22.3 15.926 15.926 0 0022.3 6.369z"
            data-name="search icon"
          />
        </svg>
      </div>
      <!-- SEARCH ICONS CLOSE -->
      <div class="search-table__icons search-table__icons--empty" v-if="statusValueInput" @click="inputEmpty">
        <svg xmlns="http://www.w3.org/2000/svg" width="49.347" height="49.345">
          <path
            d="M7.226 42.117a24.673 24.673 0 1134.895 0 24.674 24.674 0 01-34.895 0zm30.531-30.531a18.5 18.5 0 100 26.167 18.5 18.5 0 000-26.167zM18.13 35.576l-4.36-4.363 6.541-6.541-6.541-6.542 4.361-4.364 6.541 6.544 6.541-6.544 4.361 4.364-6.541 6.541 6.541 6.541-4.361 4.364-6.541-6.544-6.542 6.544z"
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
    filterData: {
      type: Function
    },
    filterBy: {
      type: String,
      required: true
    },
    placeholder: {
      required: true
    }
  },
  data() {
    return {
      value: null,
      regExp: /^[<>=]{1}\d+$/
    };
  },
  computed: {
    // STATUS VALUE INPUT
    statusValueInput() {
      return this.value ? true : false;
    }
  },
  methods: {
    // INPUT EMPTY WILL BR RETURN INPUT NULL
    inputEmpty() {
      return (this.value = null);
    },
    // POST DATA WILL BE CREATE CUSTOM EVENT AND POST NEW DATA AFTER FILTER
    postData(target) {
      return this.$emit('postData', target);
    }
  },
  watch: {
    // WATCH ON VALUE IF CHANGE WILL BE POST DATA COMPUTED FILTER DATA
    value() {
      this.postData(this.filterData(this.getData, this.value, this.filterBy, this.regExp));
    },
    // WATCH ON PLACE HOLDER IF CHANGED WILL BE RETURN INPUT NULL
    placeholder() {
      return this.inputEmpty();
    }
  },
  created() {
    // INIT DATA BEGINING WILL BE RETURN FILTER DATA
    this.postData(this.filterData(this.getData, this.value, this.filterBy, this.regExp));
  }
};
</script>

<style lang="scss">
//
.search-table {
  position: relative;
  width: 50%;
  // INPUT
  &__input {
    position: relative;
    border-radius: map-get($border-radius, first);
    overflow: hidden;

    // FEILD
    &__feild {
      width: 100%;
      padding: 10px 0 10px 70px;
      font-size: 2rem;
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

    // empty
    &--empty {
      right: 0;
      cursor: pointer;
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
