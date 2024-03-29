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
    <not-yet nameStatus="category" :status="allCategory.length == 0 && statusLoaderPage == false"></not-yet>
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
        :title="statusViewData.title"
        :statusPrice="false"
        :statusDiscount="false"
        :statusQuantity="false"
        :statusSelect="false"
        :statusSelectImage="false"
        :check="statusCheckData.check"
        :correct="statusCheckData.correct"
        :wrong="statusCheckData.wrong"
        :data="statusViewData.data"
        :getDataInfo="statusViewData.passData"
        @clickExit="statusModel = $event"
        @postAllData="statusViewData.selectFn"
      ></model-pop-up>
    </transition>
    <!-- CATEGORY -->
    <category-card
      v-if="allCategory.length !== 0"
      @opnedCategory="getAllProductsCategory"
      @statusOpenCloseCategory="statusOpenCloseCategory = $event"
      :allCategory="allCategory"
      @editCategory="getNameCategory"
      @deleteCategory="openConfirmAlert"
    >
      <template slot="renderProducts">
        <!-- LOADER -->
        <loader :status="statusLoaderCategory" selectColorLoader="white"></loader>
        <!-- IF ARRAY GREATER THAN OR EQUAL 1 -->
        <template v-if="storeData.length >= 1">
          <li v-for="item in storeData" :key="item.name">
            <span>{{ item.name }}</span>
            <span>$ {{ item.price }}</span>
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
import CategoryCard from '@/components/Admin/CategoryCard/CategoryCard';
import * as Type from '@/store/Type/index';
//
export default {
  name: 'Category',
  mixins: ['alertStatus', 'btnConfirmAndAlert'],
  data() {
    return {
      dataInfo: {
        name: null
      },
      nameCategory: null,
      statusLoaderPage: false,
      statusLoaderCategory: false,
      statusModel: false,
      statusModelEditCategory: false,
      statusOpenCloseCategory: false,
      /////////////////////////////////////
      storeData: [],
      messageEmpty: null,
      dataAdd: {
        title: 'add new category',
        label: 'enter',
        labelBtn: 'add'
      },
      dataChange: {
        title: 'change name category',
        label: 'change',
        labelBtn: 'change'
      }
    };
  },
  computed: {
    // GET ALL CATEGORY
    allCategory() {
      return this.$store.state.Admin.allCategory;
    },
    // STATUS VIEW DATA
    statusViewData() {
      //
      const { title: titleAdd, ...allDataAdd } = this.dataAdd;
      const { title: titleChange, ...allDataChange } = this.dataChange;
      //
      const title = this.statusModelEditCategory ? titleChange : titleAdd;
      const data = this.statusModelEditCategory ? allDataChange : allDataAdd;
      const passData = this.statusModelEditCategory ? this.dataInfo : {};
      const selectFn = this.statusModelEditCategory ? this.editCategory : this.sendAllCategory;
      //
      return {
        title,
        data,
        passData,
        selectFn
      };
    },
    //
    confirmedAlert() {
      return this.$store.state.Admin.confirmedDeleted;
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
      //
      this.statusLoaderCategory = true;
      //
      return this.$store
        .dispatch(Type.GET_PRODUCTS_WITH_NAME_CATEGORY, nameCategory)
        .then(data => {
          if (Object.keys(data.data()).length !== 0) {
            this.storeData = Object.values(data.data()).map(({ name, price }) => Object.assign({}, { name, price }));
          } else {
            this.messageEmpty = 'this category is empty!';
          }
          this.statusLoaderCategory = false;
        })
        .catch(() => (this.messageEmpty = 'some error please try again!'));
    },
    // GET NAME CATEGORY
    getNameCategory(nameCategory) {
      this.dataInfo.name = nameCategory;
      this.statusModelEditCategory = true;
      this.statusModel = true;
    },
    // EDIT CATEGORY
    getAllProductsFromCategory() {
      return new Promise((resolve, reject) => {
        return this.$store
          .dispatch(Type.GET_PRODUCTS_WITH_NAME_CATEGORY, this.dataInfo.name)
          .then(items => {
            if (items) {
              resolve(items.data());
            } else {
              reject();
            }
          })
          .catch(() => reject());
      });
    },
    // EDIT CATEGORY
    async editCategory(newNameCategory) {
      try {
        // RUN ALL ACTION WILL CLICK SEND DATA BASE
        this.allActionsChangeStatus({ check: true });
        // IF NEW NAME CATEGORY NOT EQUAL DATAINFO NAME
        if (newNameCategory !== this.dataInfo.name) {
          // GET ALL PRODUCTS FROM CATEGORY
          const data = await this.getAllProductsFromCategory();
          // CREATE NEW DOC AND SET ALL DATA FROM OLD DOC
          await this.$store.dispatch(Type.CREATE_NEW_DOC, { newNameCategory, data });
          // DELETE OLD DOC
          this.$store.dispatch(Type.DELETE_DOC, this.dataInfo.name);
          // CHANGE NAME FROM VUEX WITH UPDATE VIEW
          this.$store.commit(Type.CHANGE_NAME_CATEGORY, { oldNameCategory: this.dataInfo.name, newNameCategory });
          // ALL ACTIONS CHANGE STATUS
          this.allActionsChangeStatus({ check: true, correct: true, statusAlert: true, statusCorrect: true, title: 'changed name category' });
          // SET TIME OUT
          setTimeout(() => {
            // WILL BE CLOSE MODEL
            this.statusModel = false;
            // ALL ACTIONS CHANGE STATUS
            this.allActionsChangeStatus({ check: true, correct: true });
          }, 2000);
        } else {
          // ALL ACTIONS CHANGE STATUS
          this.allActionsChangeStatus({ check: true, wrong: true, title: 'not any change name please change name or cancel', statusAlert: true });
          // SET TIME OUT
          setTimeout(() => {
            this.allActionsChangeStatus();
          }, 2000);
        }
      } catch {
        // ALL ACTIONS CHANGE STATUS
        this.allActionsChangeStatus({ check: true, wrong: true, title: 'someting error please try again!', statusAlert: true });
        // SET TIME OUT
        setTimeout(() => {
          this.allActionsChangeStatus();
        }, 2000);
      }
    },
    // OPEN CONFIRM ALERT
    openConfirmAlert(nameCategory) {
      //
      const messageConfirmAlert = `are you sure delete ${nameCategory} category ?`;
      const titleBtnDelete = 'delete category';
      //
      this.nameCategory = nameCategory;
      //
      this.$store.commit(Type.CHANGE_ACTION_CONFIRM_ALERT, { messageConfirmAlert, titleBtnDelete });
    },
    // DELETE CATEGORY
    deleteCategory(nameCategory) {
      this.$store.dispatch(Type.DELETE_CATEGORY_AND_PRODUCTS, nameCategory);
    }
  },
  watch: {
    // STATUS OPEN CLOSE CATEGORY
    statusOpenCloseCategory(newValue) {
      if (!newValue) {
        this.storeData = [];
        this.messageEmpty = null;
      }
    },
    // STATUS MODEL
    statusModel(newValue) {
      if (!newValue) this.statusModelEditCategory = false;
    },
    //
    confirmedAlert(newValue) {
      if (newValue) {
        this.deleteCategory(this.nameCategory);
      }
    }
  },
  components: {
    ModelPopUp: () => import('@/components/Admin/ModelPopUp/ModelPopUp'),
    CategoryCard
  },
  created() {
    if (this.allCategory.length == 0) {
      this.statusLoaderPage = true;
      this.$store
        .dispatch(Type.GET_ALL_CATEGORY_FROM_DATABASE)
        .then(() => {
          this.statusLoaderPage = false;
        })
        .catch(() => {
          this.statusLoaderPage = false;
        });
    } else {
      this.statusLoaderPage = false;
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

  // CHANGE SOME PROP
  .loader {
    height: 90%;
  }

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
