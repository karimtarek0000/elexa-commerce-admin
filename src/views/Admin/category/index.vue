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
    <!--  -->
    <loader class="beforeSend" :status="statusLoader" selectColorLoader="#0064ff"></loader>
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
    <category-card v-if="getAllGategory.length !== 0" :allCategory="getAllGategory"></category-card>
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
      statusLoader: false,
      statusError: false
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
          this.allActionsChangeStatus({ check: true, correct: true, statusAlert: true, statusCorrect: true, data });
          // SET TIME OUT
          setTimeout(() => {
            // WILL BE CLOSE MODEL
            this.statusModel = false;
            // ALL ACTIONS CHANGE STATUS
            this.allActionsChangeStatus({ check: true, correct: true });
          }, 2000);
        })
        .catch(data => {
          // ALL ACTIONS CHANGE STATUS
          this.allActionsChangeStatus({ check: true, wrong: true, data, statusAlert: true });
          // SET TIME OUT
          setTimeout(() => {
            this.allActionsChangeStatus({});
          }, 2000);
        });
    }
  },
  components: {
    ModelPopUp,
    CategoryCard
  },
  created() {
    if (this.getAllGategory.length == 0) {
      this.statusLoader = true;
      this.$store
        .dispatch(Type.GET_ALL_CATEGORY_FROM_DATABASE)
        .then(() => {
          this.statusLoader = false;
        })
        .catch(() => {
          this.statusLoader = false;
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
