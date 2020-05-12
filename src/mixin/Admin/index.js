const modelPop = {
  //
  data() {
    return {
      statusModel: false
    };
  }
};

const dynamicHeightPages = {
  data() {
    return {
      classHeader: '.admin__header',
      classSetHeight: '.setHeight'
    };
  },
  methods: {
    // SET HEIGHT
    setHeight() {
      const windowHeight = window.innerHeight;
      const heightHeader = parseFloat(window.getComputedStyle(document.querySelector(this.classHeader)).height);
      const elem = document.querySelector(this.classSetHeight);
      // SET HEIGHT IN ELEMENT
      elem.style.setProperty('height', windowHeight - heightHeader + 'px');
    }
  },
  mounted() {
    // BEGING INIT DOM
    setTimeout(() => this.setHeight(), 500);
    // IF RESIZE WINDOW
    window.addEventListener('resize', this.setHeight);
  }
};

export default [modelPop, dynamicHeightPages];
