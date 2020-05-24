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
        :statusCorrect="!statusClose"
        :visibleClose="false"
      ></alert-status>
    </transition>
    <!-- NOT YET -->
    <not-yet nameStatus="category" :status="getAllGategory == 0"></not-yet>
    <!-- ADD BUTTON -->
    <normal-button nameBtn="add" @normalBtn="statusModel = true" :status="!statusModel">
      <GSvg nameIcon="add" title="add icon"></GSvg>
    </normal-button>
    <!-- MODEL POP UP -->
    <transition name="model">
      <model-pop-up
        v-if="statusModel"
        @clickExit="statusModel = $event"
        title="add new category"
        :statusPrice="false"
        :statusDiscount="false"
        :statusQuantity="false"
        :statusSelect="false"
        :statusSelectImage="false"
        @postAllData="sendAllCategory"
        :check="statusCheckData.check"
        :correct="statusCheckData.correct"
        :wrong="statusCheckData.wrong"
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
//
export default {
  name: 'Category',
  mixins: ['modelPop', 'alertStatus', 'btnConfirmAndAlert'],
  data() {
    return {};
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
      //
      this.allActionsChangeStatus({ check: true });
      //
      this.$store
        .dispatch('Admin/addAndUpdateCategory', nameCategory)
        .then(() => {
          this.allActionsChangeStatus({ correct: true });
          //
          setTimeout(() => {
            this.statusModel = false;
            this.allActionsChangeStatus({});
          }, 2000);
        })
        .catch(data => {
          this.allActionsChangeStatus({ check: true, wrong: true, data, statusAlert: true });
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
  watch: {
    statusModel(n) {
      if (!n) {
        this.allActionsChangeStatus({});
      }
    }
  },
  mounted() {
    if (this.getAllGategory.length == 0) {
      this.$store.dispatch('Admin/getAllCategoryFromDatabase');
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
    top: -110px;
    z-index: 10000;
    width: 56%;

    // RESPONSIVE
    @include respond(tablet-l) {
      top: -40px;
    }
    @include respond(tablet-p) {
      width: 65%;
      top: -20px;
    }
    @include respond(760px) {
      width: 77%;
    }
  }
}
</style>
