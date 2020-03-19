<template>
  <div class="admin__header">
      <p>notifcations</p>
  </div>
</template>

<script>
export default {
    name: 'HeaderAdmin',
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>

// ADMIN HEADER
.admin__header {
    background-color: map-get($background, back-second);
    grid-area: start-header / start-header / end-header / end-header;
}
</style>