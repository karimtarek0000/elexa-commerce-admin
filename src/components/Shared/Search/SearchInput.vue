<template>
  <!-- SEARCH -->
  <div class="search">
    <!-- SEARCH INPUT -->
    <div :class="['search__input', { 'search__input--active': statusFocus }]">
      <!-- SEARCH INPUT -->
      <input
        class="search__input__feild"
        type="text"
        :placeholder="`${placeholder}...`"
        v-model="value"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="submit"
      />
      <!-- SEARCH ICONS SEARCH -->
      <div class="search__icons search__icons--search">
        <svg xmlns="http://www.w3.org/2000/svg" width="50.875" height="50.875">
          <path
            d="M49.475 49.475a4.777 4.777 0 01-6.757 0l-8.432-8.432a22.407 22.407 0 116.757-6.757l8.432 8.432a4.777 4.777 0 010 6.757zM22.3 6.369A15.927 15.927 0 1038.222 22.3 15.926 15.926 0 0022.3 6.369z"
            data-name="search icon"
            :fill="fillIcon"
          />
        </svg>
      </div>
      <!-- SEARCH ICONS CLOSE -->
      <div
        class="search__icons search__icons--close"
        :style="{ opacity: statusFocus ? 1 : 0, pointerEvents: statusFocus ? 'all' : 'none' }"
        @click="emptyInput"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="49.347" height="49.345">
          <path
            d="M7.226 42.117a24.673 24.673 0 1134.895 0 24.674 24.674 0 01-34.895 0zm30.531-30.531a18.5 18.5 0 100 26.167 18.5 18.5 0 000-26.167zM18.13 35.576l-4.36-4.363 6.541-6.541-6.541-6.542 4.361-4.364 6.541 6.544 6.541-6.544 4.361 4.364-6.541 6.541 6.541 6.541-4.361 4.364-6.541-6.544-6.542 6.544z"
          />
        </svg>
      </div>
    </div>
    <!-- SEARCH RESULT -->
    <transition name="slide">
      <!-- SEARCH RESULT -->
      <div class="search__result" v-if="statusFocus">
        <ul class="search__list" ref="searchList">
          <li
            :class="['search__item', { 'search__item--active': selected == index }]"
            @click="clicks(index)"
            ref="searchItem"
            v-for="(data, index) in filtersData"
            :key="data.id"
          >
            {{ data[filterBy] }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  // PROPS
  props: {
    getData: {
      type: Array,
      required: false // true
    },
    filterBy: {
      type: String,
      required: false // true
    },
    fillIcon: {
      type: [Number, String],
      required: false,
      default: 'white'
    },
    placeholder: {
      type: String,
      required: false,
      default: 'search'
    }
  },
  data() {
    return {
      selected: 0,
      statusFocus: false,
      statusAction: true,
      value: '',
      newValue: ''
    };
  },
  watch: {
    // IF INPUT VALUE NOT EMPTY WILL BE RETURN STATUS FOCUS EQUAL TRUE ELSE STATUS FOCUS EQUAL FALSE
    value(ne) {
      if (ne && this.statusAction) {
        this.statusFocus = true;
        this.selected = 0;
      } else {
        this.statusFocus = false;
      }
    },
    // FILTERS DATA
    filtersData(ne) {
      if (ne.length == 0) {
        return (this.statusFocus = false);
      }
    }
  },
  computed: {
    // FILTERS DATA
    filtersData() {
      // IF VALUE EQUAL EMPTY WILL BE RETURN EMTY ARRAY
      if (!this.value) return [];

      // RETURN FILTER DATA
      return this.getData.filter(item => item[this.filterBy].toLowerCase().startsWith(this.value.toLowerCase()));
    },
    // HEIGHT ITEM
    heightItem() {
      return parseFloat(window.getComputedStyle(this.$refs.searchItem[0]).height);
    }
  },
  methods: {
    // SUBMIT
    submit() {
      this.newValue = this.filtersData[this.selected];
      this.$emit('change', JSON.parse(JSON.stringify(this.newValue)));
      this.statusFocus = false;
      this.value = this.newValue[this.filterBy];
      this.statusAction = false;
    },
    // EMPTY INPUT
    emptyInput() {
      this.value = '';
      this.selected = 0;
    },
    // CLICKS
    clicks(index) {
      this.selected = index;
      setTimeout(() => {
        // RUNINNG SUBMIT
        this.submit();
      }, 50);
    },
    // MOVE SCROLL
    moveScroll() {
      return (this.$refs.searchList.scrollTop = this.selected * this.heightItem);
    },
    // UP
    up() {
      if (this.selected > 0) {
        this.selected -= 1;
        // RUNINNG MOVE SCROLL
        this.moveScroll();
      }
    },
    // DOWN
    down() {
      if (this.selected < this.filtersData.length - 1) {
        this.selected += 1;
        // RUNINNG MOVE SCROLL
        this.moveScroll();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
////////////////////////////////
// VARIABLES
$borderRadius: 0.8rem;
$background: (
  color-first: white,
  color-second: #0064ff
);
$colors: (
  color-first: #a28a8a,
  color-second: #afadad,
  color-third: #0064ff
);

//////////////////////////////
// SEARCH
.search {
  position: relative;
  min-height: 50px;
  padding: 5px;
  grid-column: start-search / end-search;

  // INPUT
  &__input {
    position: relative;
    border-radius: $borderRadius;
    overflow: hidden;
    transition: all 0.5s;

    // ACTIVE
    &--active {
      box-shadow: 0 3px 5px 0 rgba(193, 136, 136, 0.5);
    }

    // FEILD
    &__feild {
      width: 100%;
      padding: 1rem 0 1rem 70px;
      font-size: 20px;
      border: 0;
      color: map-get($colors, color-third);
      background-color: map-get($background, color-first);
      outline: none;
      appearance: none;
      font-family: inherit;
      font-weight: 300;
    }

    // PLACEHOLDER
    ::placeholder {
      color: map-get($colors, color-third);
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

    // SEARCH
    &--search {
      background-color: map-get($background, color-second);
      left: 0;
    }

    // CLOSE
    &--close {
      right: 0;
      transition: opacity 0.5s;
      cursor: pointer;

      & svg {
        fill: map-get($background, color-second);
        transition: fill 0.5s;

        //
        &:hover {
          fill: white;
        }
      }
    }

    // SVG
    & svg {
      transform: scale(0.5);
    }
  }

  // RESULT
  &__result {
    background-color: map-get($background, color-first);
    margin-top: 7px;
    width: 100%;
    height: 150px;
    border-radius: $borderRadius;
    overflow: hidden;
  }

  // LIST
  &__list {
    list-style: none;
    max-height: 150px;
    overflow-y: auto;
  }

  // ITEM
  &__item {
    font-size: 20px;
    background-color: map-get($background, color-second);
    padding: 10px;
    margin: 10px 0;
    transition: background-color 0.5s;
    cursor: pointer;

    // ACTIVE
    &--active {
      background-color: darken(map-get($background, color-second), 10%);
      font-weight: bold;
    }

    // HOVER
    &:hover {
      background-color: darken(map-get($background, color-second), 10%);
    }
  }
}

///////////////////////////////
// ANIMATION
.slide-enter-active {
  animation: inter 0.5s ease-in-out;
}

.slide-leave-active {
  animation: leave 0.5s ease-in-out;
}

//
@keyframes inter {
  0% {
    height: 0px;
  }
  100% {
    max-height: 2000px;
  }
}

@keyframes leave {
  0% {
    max-height: 2000px;
  }
  100% {
    height: 0px;
  }
}
</style>
