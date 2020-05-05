<template>
  <div class="products-page">
    <!-- ALERT NOT YET -->
    <!-- <not-yet nameStatus="products" :status="!statusModel"></not-yet> -->
    <!-- NORMAL BUTTON ADD -->
    <normal-button nameBtn="add" @normalBtn="c" :status="!statusModel"></normal-button>
    <!-- LOADER PAGE -->
    <loader :status="false" selectColorLoader="#0064ff"></loader>
    <!-- MODEL POP UP -->
    <transition name="model">
      <model-pop-up v-if="statusModel" @clickExit="statusModel = $event" title="add new product" @postAllData="v"></model-pop-up>
    </transition>
    <!-- ALL PRODUCTS CARD-->
    <div class="products-page__all-products-card" v-if="false">
      <card-view
        v-for="(data, index) in allData"
        :key="index"
        :title="data.name"
        :price="data.price"
        :discount="data.discount"
        :quantity="data.quantity"
      ></card-view>
    </div>
    <!-- SEARCH INPUT TABLE -->
    <search-input-table :getData="vv" @postData="newDataFilter = $event" :filterBy="filterBy"></search-input-table>
    <!-- ALL PRODUCTS TABLE -->
    <div class="products-page__all-products-tabel">
      <table-data :headerData="titles" :bodyData="newDataFilter" @dataFilter="filterBy = $event">
        <GSvg slot="icon-edit" nameIcon="add"></GSvg>
        <GSvg slot="icon-delete" nameIcon="delete"></GSvg>
      </table-data>
    </div>
    <!-- PAGINATION -->
    <pagination :total="5000" :perPage="10" :currentPage="current" @changePage="mm">
      <GSvg slot="prev" nameIcon="angle-up"></GSvg>
      <GSvg slot="next" nameIcon="angle-up"></GSvg>
    </pagination>
  </div>
</template>

<script>
//
import ModelPopUp from '@/components/Admin/ModelPopUp/ModelPopUp';
import CardView from '@/components/Admin/CardView/CardView';
import TableData from '@/components/Admin/TableData/TableData';
//
export default {
  name: 'Products',
  mixins: ['modelPop'],
  data() {
    return {
      filterBy: 'name',
      current: this.$route.query.page || 1,
      allData: [],
      newDataFilter: [],
      vv: [
        {
          name: 'samsung note 10',
          price: 2000,
          discount: 300,
          quantity: 10
        },
        {
          name: 'apple iphone pro max',
          price: 19000,
          discount: 0,
          quantity: 100
        },
        {
          name: 'apple - mac book pro',
          price: 22000,
          discount: 1000,
          quantity: 20
        },
        {
          name: 'toshiba tv',
          price: 22000,
          discount: 1000,
          quantity: 20
        },
        {
          name: 'toshiba mobile',
          price: 5000,
          discount: 1000,
          quantity: 45
        },
        {
          name: 'nokia 20',
          price: 10000,
          discount: 1000,
          quantity: 40
        },
        {
          name: 'nokia 23',
          price: 10000,
          discount: 1000,
          quantity: 40
        }
      ],
      titles: ['#', 'name', 'price', 'discount', 'quantity', 'edit', 'delete']
    };
  },
  methods: {
    c() {
      return (this.statusModel = true);
    },
    v(data) {
      return this.vv.push(data);
    },
    n(c) {
      return console.log(c);
    },
    mm(page) {
      this.current = page;
      this.$router.push({ query: { page } });
    }
  },
  //
  components: {
    ModelPopUp,
    CardView,
    TableData
  }
};
</script>

<style lang="scss">
// PRODUCTS PAGE
.products-page {
  position: relative;
  width: 100%;
  height: 100%;

  // NORMAL BTN
  & > .normal-btn {
    @extend %editNormalBtn;
  }

  // ALL PRODUCTS
  &__all-products {
    // CARD
    &-card {
      @extend %gridPageItem;
    }
    // TABLE
    &-table {
    }
  }

  // CHANGE SOME PROP
  .loader {
    &__icon {
      width: 50px;
      height: 50px;
      border-width: 4px;
    }
  }
}
</style>
