<template>
  <div class="table-info">
    <!-- TABLE HEAD -->
    <div class="table-info__head">
      <div class="table-info__row">
        <template v-for="(title, index) in headerData">
          <span
            :class="['table-info__data', { 'table-info__data--active': index == current }]"
            :key="index"
            @click="getHeaderTitle(index, title)"
            >{{ title }}</span
          >
        </template>
      </div>
    </div>
    <!-- TABLE BODY -->
    <div class="table-info__body">
      <div class="table-info__row" v-for="(data, index) in bodyData" :key="index">
        <span class="table-info__data num" v-text="index + 1"></span>
        <span class="table-info__data name" v-text="data.name"></span>
        <span class="table-info__data price"><span>&dollar;</span>{{ data.price }}</span>
        <span class="table-info__data discount" v-text="data.discount"></span>
        <span class="table-info__data quantity" v-text="data.quantity">5</span>
        <span class="table-info__data edit">
          <slot name="icon-edit"></slot>
        </span>
        <span class="table-info__data delete" @click="deleteItem(data.name)">
          <slot name="icon-delete"></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableData',
  props: {
    headerData: {
      type: Array,
      required: true
    },
    bodyData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      current: 1
    };
  },
  methods: {
    // GET HEADER TITLE
    getHeaderTitle(index, title) {
      if (title !== 'edit' && title !== 'delete' && title !== '#') {
        this.$emit('dataFilter', title);
        this.current = index;
      }
    },
    //
    deleteItem(name) {
      return this.$emit('deleteItem', name);
    }
  }
};
</script>

<style lang="scss">
// TABLE DATA
.table-info {
  display: table;
  font-size: 2rem;
  width: 100%;
  // HEAD
  &__head {
    display: table-header-group;
    background-color: map-get($background, back-first);
    color: map-get($color, color-first);
    fill: black;
    font-weight: 400;
    text-transform: uppercase;
    cursor: pointer;
  }

  // BODY
  &__body {
    display: table-row-group;
    font-size: 0.8em;
    font-weight: 300;
    text-transform: capitalize;

    //
    .num {
      width: 5%;
    }

    // NAME
    .name {
      width: 60%;
    }

    // PRICE AND DISCOUNT AND QUANTITY
    .price,
    .discount,
    .quantity {
      width: calc(35% / 4);
    }
  }

  // ROW
  &__row {
    display: table-row;
    vertical-align: middle;
    text-align: center;

    //
    &:nth-child(even) {
      background-color: map-get($background, back-ninth);
      color: white;
    }
  }

  // DATA
  &__data {
    display: table-cell;
    padding: 10px;
    border: 0.5px solid;
    border-color: transparent transparent black black;

    //
    &--active {
      background-color: map-get($background, back-eighth);
    }

    // LAST OF TYPE
    &:last-of-type {
      border-right-color: black;
    }
  }
}
</style>
