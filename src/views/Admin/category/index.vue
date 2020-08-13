<template>
  <div class="category-page">
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
    <!-- NOT YET -->
    <not-yet nameStatus="category" :status="getAllGategory == 0 || statusError"></not-yet>
    <!-- LOADER  -->
    <loader class="beforeSend" :status="statusLoaderPage" selectColorLoader="#0064ff"></loader>
    <!-- ADD BUTTON -->
    <normal-button nameBtn="add" @normalBtn="statusModel = true" :status="!statusModel">
      <GSvg nameIcon="add" title="add icon"></GSvg>
    </normal-button>
    <!-- MODEL POP UP -->
    <transition name="model">
      <model-pop-up
        v-if="statusModel"
        title="add new category"
        :statusPrice="false"
        :statusDiscount="false"
        :statusQuantity="false"
        :statusSelect="false"
        :statusSelectImage="false"
        :check="statusCheckData.check"
        :correct="statusCheckData.correct"
        :wrong="statusCheckData.wrong"
        @clickExit="statusModel = $event"
        @postAllData="sendAllCategory"
      ></model-pop-up>
    </transition>
    <!-- CATEGORY -->
    <category-card
      v-if="getAllGategory.length !== 0"
      @opnedCategory="getAllProductsCategory"
      @statusOpenCloseCategory="statusOpenCloseCategory = $event"
      :allCategory="getAllGategory"
    >
      <template slot="renderProducts">
        <!-- LOADER -->
        <loader :status="statusLoaderCategory" selectColorLoader="white"></loader>
        <!-- IF ARRAY GREATER THAN OR EQUAL 1 -->
        <template v-if="test.length >= 1">
          <li v-for="t in test" :key="t.name">
            <span>{{ t.name }}</span>
            <span>$ {{ t.price }}</span>
          </li>
        </template>
        <!-- ELSE -->
        <template v-else>
          <p>{{ messageEmpty }}</p>
        </template>
      </template>
    </category-card>
  </div>
</template>

<script>
//
import ModelPopUp from '@/components/Admin/ModelPopUp/ModelPopUp';
import CategoryCard from '@/components/Admin/CategoryCard/CategoryCard';
import * as Type from '@/store/Type/index';
//
export default {
  name: 'Category',
  mixins: ['modelPop', 'alertStatus', 'btnConfirmAndAlert'],
  data() {
    return {
      statusLoaderPage: false,
      statusError: false,
      statusOpenCloseCategory: false,
      test: [],
      messageEmpty: null,
      statusLoaderCategory: false
    };
  },
  computed: {
    // GET ALL CATEGORY
    getAllGategory() {
      return this.$store.state.Admin.allCategory;
    }
  },
  methods: {
    // SEND ALL CATEGORY
    sendAllCategory(nameCategory) {
      // RUN ALL ACTION WILL CLICK SEND DATA BASE
      this.allActionsChangeStatus({ check: true });
      // AJAX CALL WILL BE SEND NAME CATEGORY
      this.$store
        .dispatch(Type.ADD_AND_UPDATE_CATEGORY, nameCategory)
        .then(data => {
          // ALL ACTIONS CHANGE STATUS
          this.allActionsChangeStatus({ check: true, correct: true, statusAlert: true, statusCorrect: true, title: data });
          // SET TIME OUT
          setTimeout(() => {
            // WILL BE CLOSE MODEL
            this.statusModel = false;
            // ALL ACTIONS CHANGE STATUS
            this.allActionsChangeStatus({ check: true, correct: true });
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
    // GET ALL PRODUCTS CATEGORY
    getAllProductsCategory(nameCategory) {
      this.statusLoaderCategory = true;
      return this.$store
        .dispatch(Type.GET_PRODUCTS_WITH_NAME_CATEGORY, nameCategory)
        .then(data => {
          if (Object.keys(data.data()).length !== 0) {
            this.test = Object.values(data.data()).map(({ name, price }) => Object.assign({}, { name, price }));
          } else {
            this.messageEmpty = 'this category is empty!';
          }
          this.statusLoaderCategory = false;
        })
        .catch(() => console.log('error'));
    }
  },
  watch: {
    //
    statusOpenCloseCategory(newValue) {
      if (!newValue) {
        this.test = [];
        this.messageEmpty = null;
      }
    }
    //
    // test(newValue) {
    //   if (newValue.length == 0) {
    //     console.log('empty');
    //   }
    // }
  },
  components: {
    ModelPopUp,
    CategoryCard
  },
  created() {
    if (this.getAllGategory.length == 0) {
      this.statusLoaderPage = true;
      this.$store
        .dispatch(Type.GET_ALL_CATEGORY_FROM_DATABASE)
        .then(() => {
          this.statusLoaderPage = false;
        })
        .catch(() => {
          this.statusLoaderPage = false;
          this.statusError = true;
        });
    }
  }
};
</script>

<style lang="scss">
// CATEGORY PAGE
.category-page {
  position: relative;
  width: 100%;
  height: 100%;

  & > .normal-btn {
    @extend %editNormalBtn;
  }

  // ALERT STATUS SLIDE
  .alert__status--slide {
    @extend %alert-status-slide;
  }
  // LOADER
  .beforeSend {
    top: -20px;
  }
}
</style>
