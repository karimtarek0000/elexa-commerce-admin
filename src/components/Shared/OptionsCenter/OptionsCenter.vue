<template>
  <div class="admin__options__center">
    <!-- START GSVG -->
    <div class="admin__options__center__fullscreen" @click="toggleFullScreen">
      <GSvg
        :nameIcon="statusFullBrowser ? 'fullscreen' : 'fullscreen_exit'"
        :title="statusFullBrowser ? 'full screen icon' : 'exit full screen icon'"
      ></GSvg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OptionsCenter',
  data() {
    return {
      statusFullBrowser: true
    };
  },
  methods: {
    // TOGGLE FULL SCREEN
    toggleFullScreen() {
      return (this.statusFullBrowser = !this.statusFullBrowser);
    },
    // FULL SCREEN
    fullScreen() {
      //
      const elm = document.documentElement;

      if (elm.requestFullscreen) {
        elm.requestFullscreen();
      } else if (elm.mozRequestFullScreen) {
        elm.mozRequestFullScreen();
      } else if (elm.webkitRequestFullscreen) {
        elm.webkitRequestFullscreen();
      }
    },
    // CLOSE FULL SCREEN
    closeFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  },
  watch: {
    // WATCH STATUS FULL BROWSER
    statusFullBrowser(n) {
      // IF NEW RESULT EQUAL FALSE
      if (!n) {
        // RUN FUNCTION FULL SCREEN
        this.fullScreen();
      } else {
        // RUN CLOSE FULL SCREEN
        this.closeFullScreen();
      }
    }
  }
};
</script>

<style lang="scss">
// ADMIN
.admin {
  // OPTIONS CENTER
  &__options__center {
    display: flex;
    grid-column: col-start 2 / col-end 2;
    justify-content: center;

    // FULL SCREEN
    &__fullscreen {
      display: flex;
      align-items: center;
      background-color: map-get($background, back-first);
      border-radius: map-get($border-radius, second);
      cursor: pointer;

      // RESPONSIVE
      @include respond(800px) {
        opacity: 0;
      }
    }
  }
}
</style>
