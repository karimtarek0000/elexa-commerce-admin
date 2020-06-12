<template>
  <section class="products-page">
    <!-- ALERT STATUS -->
    <transition name="alert">
      <alert-status
        key="1"
        v-if="statusClickCloseAlert"
        :title="titles"
        :visibleSlide="true"
        :status="statusClickCloseAlert"
        :statusCorrect="statusCheckData.statusCorrect"
        :visibleClose="false"
      ></alert-status>
    </transition>
    <!-- ALERT NOT YET -->
    <not-yet nameStatus="products" :status="vv.length == 0"></not-yet>
    <!-- NORMAL BUTTON ADD -->
    <normal-button nameBtn="add" @normalBtn="statusModel = true" :status="!statusModel">
      <GSvg nameIcon="add" title="add icon"></GSvg>
    </normal-button>
    <!-- LOADER PAGE -->
    <loader :status="false" selectColorLoader="#0064ff"></loader>
    <!-- MODEL POP UP -->
    <transition name="model">
      <model-pop-up
        v-if="statusModel"
        title="add new product"
        :check="statusCheckData.check"
        :correct="statusCheckData.correct"
        :wrong="statusCheckData.wrong"
        :statusLoader="statusLoader"
        :getAllCategory="getAllGategory"
        :sendNewImage="imageUrl"
        :textButton="textButton"
        @sendDataImg="getImageData"
        @clickExit="statusModel = $event"
        @postAllData="sendAllProducts"
        @changeNewImage="imageUrl = $event"
      ></model-pop-up>
    </transition>
    <!-- PRODUCTS PAGE ACTIONS -->
    <div class="products-page__actions">
      <!-- SEARCH INPUT TABLE -->
      <search-input-table
        v-if="!statusGrid"
        :getData="vv"
        :placeholder="changePlaceHolder"
        @postData="newDataFilter = $event"
        :filterBy="filterBy"
        :filterData="filterProducts"
      ></search-input-table>
      <!-- SORT -->
      <div class="products-page__actions__sort" v-if="sort.statusSort">
        <!-- ASC -->
        <div
          :class="['products-page__actions__sort__asc', { 'products-page__actions__sort__asc--active': sort.asc }]"
          @click="ascData"
        >
          <GSvg nameIcon="sort-numeric-asc" title="asc sort"></GSvg>
        </div>
        <!-- DESC -->
        <div
          :class="['products-page__actions__sort__desc', { 'products-page__actions__sort__desc--active': sort.desc }]"
          @click="descData"
        >
          <GSvg nameIcon="sort-numberic-desc" title="desc sort"></GSvg>
        </div>
      </div>
      <!-- CHANGE GRID -->
      <div class="products-page__actions__grid">
        <!-- TABLE -->
        <div
          :class="['products-page__actions__grid__table', { 'products-page__actions__grid__table--active': !statusGrid }]"
          @click="statusGrid = false"
        >
          <GSvg nameIcon="list" title="list view"></GSvg>
        </div>
        <!-- CARD -->
        <div
          :class="['products-page__actions__grid__card', { 'products-page__actions__grid__card--active': statusGrid }]"
          @click="statusGrid = true"
        >
          <GSvg nameIcon="grid" title="card view"></GSvg>
        </div>
      </div>
    </div>
    <!-- ALL PRODUCTS CARD-->
    <div class="products-page__all-products-card" v-if="statusGrid">
      <card-view
        v-for="(data, index) in vv"
        :key="index"
        :title="data.name"
        :price="data.price"
        :discount="data.discount"
        :quantity="data.quantity"
      ></card-view>
    </div>
    <!-- ALL PRODUCTS TABLE -->
    <div class="products-page__all-products-tabel" v-if="!statusGrid">
      <table-data
        :headerData="titlesTable"
        :bodyData="newDataFilter"
        @dataFilter="filterBy = $event"
        @deleteItem="deleteItemFromData"
      >
        <GSvg slot="icon-edit" nameIcon="edit"></GSvg>
        <GSvg slot="icon-delete" nameIcon="delete"></GSvg>
      </table-data>
    </div>
    <!-- PAGINATION -->
    <pagination :total="5000" :perPage="10" :currentPage="current" @changePage="getPage">
      <GSvg slot="prev" nameIcon="angle-up"></GSvg>
      <GSvg slot="next" nameIcon="angle-up"></GSvg>
    </pagination>
  </section>
</template>

<script>
//
import ModelPopUp from '@/components/Admin/ModelPopUp/ModelPopUp';
import CardView from '@/components/Admin/CardView/CardView';
import TableData from '@/components/Admin/TableData/TableData';
import * as Type from '@/store/Type/index';
//
export default {
  name: 'Products',
  mixins: ['modelPop', 'alertStatus', 'btnConfirmAndAlert'],
  data() {
    return {
      filterBy: 'name',
      sort: {
        asc: false,
        desc: false,
        statusSort: false
      },
      statusGrid: true,
      current: this.$route.query.page || 1,
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
      titlesTable: ['#', 'name', 'price', 'discount', 'quantity', 'edit', 'delete'],
      imageUrl: null,
      imageName: null,
      statusLoader: false,
      textButton: 'upload image',
      sendDataSuccess: false
    };
  },
  computed: {
    // CHANGE PLACEHOLDER
    changePlaceHolder() {
      if (this.filterBy == 'name') {
        return `search in table with ${this.filterBy}`;
      } else if (this.filterBy == 'price' || this.filterBy == 'discount' || this.filterBy == 'quantity') {
        return `search in table with ${this.filterBy} - can use filter > <`;
      } else {
        return 'no';
      }
    },
    // GET ALL CATEGORY
    getAllGategory() {
      return this.$store.state.Admin.allCategory;
    }
  },
  methods: {
    // ASC DATA
    ascData() {
      this.newDataFilter.sort((asc, desc) => asc[this.filterBy] - desc[this.filterBy]);
      this.sort.asc = true;
      this.sort.desc = false;
    },
    // DESC DATA
    descData() {
      this.newDataFilter.sort((asc, desc) => desc[this.filterBy] - asc[this.filterBy]);
      this.sort.asc = false;
      this.sort.desc = true;
    },
    // SEND ALL CATEGORY
    sendAllProducts(dataProducts) {
      // DESTRUCTRING OBJECT
      const { selectCategory, ...data } = dataProducts;
      // RUN ALL ACTION WILL CLICK SEND DATA BASE
      this.allActionsChangeStatus({ check: true });
      // ASSIGN URL IN IMAGE
      const updateData = Object.assign(data, { image: this.imageUrl });
      // AJAX CALL WILL BE SEND NAME PRODUCTS
      this.$store
        .dispatch(Type.ADD_PRODUCT_IN_CATEGORY, { nameDoc: selectCategory, name: data.name, data: updateData })
        .then(data => {
          // ALL ACTIONS CHANGE STATUS
          this.allActionsChangeStatus({ check: true, correct: true, statusAlert: true, statusCorrect: true, title: data });
          // SET TIME OUT
          setTimeout(() => {
            // WILL BE CLOSE MODEL
            this.statusModel = false;
            // ALL ACTIONS CHANGE STATUS
            this.allActionsChangeStatus({ check: true, correct: true });

            //
            this.sendDataSuccess = true;
          }, 2000);
        })
        .catch(err => {
          // ALL ACTIONS CHANGE STATUS
          this.allActionsChangeStatus({ check: true, wrong: true, title: err, statusAlert: true });
          // SET TIME OUT
          setTimeout(() => {
            this.allActionsChangeStatus();
          }, 2000);
        });
    },
    // GET PAGE
    getPage(page) {
      this.current = page;
      this.$router.push({ query: { page } });
    },
    // FILTER PRODUCTS
    filterProducts(allData, value, filterBy, regExp) {
      // IF THE VALUE EQUAL FALSE WILL BE RETURN GET DATA
      if (!value || value == '>' || value == '<') {
        return allData;
      } else if (!isNaN(value)) {
        return allData.filter(data => data[filterBy] == value);
      } else if (isNaN(value) && regExp.test(value)) {
        // ALL VAR (GETNUM - GETSYM)
        const getNum = +value.match(/\d+/)[0];
        const getSym = value.match(/[<>]{1}/)[0];

        // IF STATEMENT STATUS EQUAL > OR EQUAL <
        if (getSym == '>') {
          return allData.filter(data => data[filterBy] > getNum);
        } else if (getSym == '<') {
          return allData.filter(data => data[filterBy] < getNum);
        }
      } else {
        return allData.filter(data => data[filterBy].toLowerCase().includes(value.toLowerCase()));
      }
    },
    // DELETE ITEM
    deleteItemFromData(name) {
      this.vv.forEach((cur, index) => {
        if (cur.name == name) {
          this.vv.splice(index, 1);
          this.newDataFilter = this.vv;
        }
      });
    },
    //
    deleteImage(getDataImage) {
      // IF THIS IMAGE NAME EXSIST IMAGE NAME WILL BE DELETE IMAGE IN FIREBASE
      // DELETE IMAGE BEFORE NEW ADD IMAGE IN FIRESTORE
      if (this.imageName) this.$store.dispatch(Type.DELETE_IMAGE, this.imageName);

      // GET DATA IMAGE AND DESTRICURING
      const { name, lastModified } = getDataImage;

      // ADD NAME IMAGE IN IMAGE NAME
      this.imageName = `${lastModified}_${name}`;
    },
    // GET IMAGE DATA
    getImageData(dataImage) {
      // CHANGE STATUS LOADER EQUAL TRUE
      this.statusLoader = true;

      // RUN DELETE IMAGE
      this.deleteImage(dataImage);

      // UPLOAD IMAGE IN FIRESTORE
      this.$store.dispatch(Type.PREVIEW_IMAGE_PRODUCT, dataImage).then(imageUrl => {
        // CHANGE TEXT BUTTON
        this.textButton = 'change image';
        // CHANGE STATUS LOADER EQUAL FALSE
        this.statusLoader = false;
        // ADD IMAGE URL IN IMAGE URL
        this.imageUrl = imageUrl;
      });
    }
  },
  watch: {
    // WATCH FILTER BY
    filterBy(newGet) {
      this.sort.asc = false;
      this.sort.desc = false;
      newGet !== 'name' ? (this.sort.statusSort = true) : (this.sort.statusSort = false);
    },
    statusGrid(n) {
      if (!n) {
        this.filterBy = 'name';
        this.sort.statusSort = false;
      } else {
        this.sort.statusSort = false;
      }
    },
    statusModel(n) {
      if (!n) {
        // RETURN IMAGE URL EQUAL NULL
        this.imageUrl = null;
        // RETURN TEXT BUTTON PERVIOUES CASE
        this.textButton = 'upload image';
        // IF SEND DATA SECCESS EQUAL FALSE WILL BE DELETE IMAGE FROM FIREBASE
        if (!this.sendDataSuccess) {
          this.$store.dispatch(Type.DELETE_IMAGE, this.imageName).then(() => {
            this.imageName = null;
          });
        } else {
          this.imageName = null;
        }
      }
    }
  },
  components: {
    ModelPopUp,
    CardView,
    TableData
  },
  created() {
    if (this.getAllGategory.length == 0) this.$store.dispatch(Type.GET_ALL_CATEGORY_FROM_DATABASE);
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
      overflow: auto;
      max-height: 60vh;
      @extend %gridPageItem;
    }

    // TABLE
    &-tabel {
      overflow: hidden;
      border-radius: map-get($border-radius, third) map-get($border-radius, third) 0 0;
    }

    // TABLE AND CARD
    &-tabel,
    &-card {
      margin-top: 1rem;
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

  // ACTIONS
  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;

    // SORT
    &__sort {
      display: flex;
      justify-content: space-between;
      width: 10rem;
      // ASC AND DESC
      &__asc,
      &__desc {
        border-radius: map-get($border-radius, first);
        border: 1px solid map-get($background, back-fifth);
        padding: 1rem;
        margin-left: 2rem;
        cursor: pointer;
        // ACTIVE
        &--active {
          background-color: map-get($background, back-first);
          box-shadow: map-get($shadow, first);
        }
      }
    }

    // GRID
    &__grid {
      display: flex;
      align-items: center;
      margin-left: auto;

      //
      &__table,
      &__card {
        border-radius: map-get($border-radius, first);
        padding: 0.5rem;
        //
        &--active {
          background-color: map-get($background, back-first);
          box-shadow: map-get($shadow, first);
        }
      }
    }
  }

  // ALERT STATUS SLIDE
  .alert__status--slide {
    @extend %alert-status-slide;
  }

  //
  .loader__icon {
    width: 30px;
    height: 30px;
    border-width: 3px;
  }
}
</style>
