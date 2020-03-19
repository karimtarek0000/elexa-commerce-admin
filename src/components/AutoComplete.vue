<template>
  <div class="autocomplete">
    <div
      class="input"
      @click="toggleVisible"
      v-text="selectedItems ? selectedItems[filterBy] : ''"
    ></div>
    <div class="popup" v-show="visible">
      <input
        type="text"
        v-model="value"
        placeholder="search"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="selectItem"
        @focus="visible == true"
        ref="inputField"
      />
      <div class="option" ref="optionsList">
        <ul>
          <li
            v-for="(match, index) in matches"
            :key="match.id"
            :class="{ selected: select == index }"
            v-text="match[filterBy]"
            @click="addClicks(index)"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AutoComplete",
  props: ["items", "filterBy", "height"],
  data() {
    return {
      selectedItems: null,
      value: "",
      visible: false,
      select: 0
    };
  },
  methods: {
    addClicks(index) {
      this.select = index;
      this.selectItem();
    },
    toggleVisible() {
       this.visible = !this.visible;
       setTimeout( ()=> {
         this.$refs.inputField.focus();
       }, 50)
    },
    selectItem() {
      this.selectedItems = this.matches[this.select];
      this.visible = false;
      this.$emit('getSearch', JSON.parse(JSON.stringify(this.selectedItems)));
    },
    up() {
      if (this.select == 0) {
        return
      } else {
        this.select-=1;
        this.scrollToItem();
      }
    
    },
    down() {
      if (this.select >= this.matches.length - 1) {
        return;
      } else {
        this.select += 1;
        this.scrollToItem();
      }
    },
    scrollToItem() {
      return (this.$refs.optionsList.scrollTop = this.select * this.height);
    }
  },
  watch: {
    value(n) {
      return this.$emit('change', n);
    },
    visible(n) {
      if(!n) {
        this.value = "";
        this.select = 0;
      }
    }
  },
  computed: {
    matches() {
      if (this.value == "") {
        return [];
      } else {
        return this.items.filter(item =>
          item[this.filterBy].toLowerCase().startsWith(this.value.toLowerCase())
        );
      }
    }
  }
};
</script>

<style lang="scss">
.autocomplete {
  position: relative;
  width: 50%;
  margin: 200px auto;
}

.input {
  width: 100%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.61);
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 0 5px rgb(163, 153, 153);
  font-size: 2rem;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

.popup {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.61);
  padding: 10px;
}

.popup input {
  display: inline-block;
  width: 100%;
  padding: 10px 0 10px 5px;
  font-size: 2rem;
}

.option {
  overflow-y: auto;
  max-height: 100px;
}

ul li {
  list-style: none;
  padding: 10px;
  border: 1px solid;
  border-color: transparent black black black;
  font-size: 1.5rem;
  cursor: pointer;
}

.selected {
  background-color: orange;
}
</style>
