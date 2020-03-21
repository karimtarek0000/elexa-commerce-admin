<template>
  <svg>
    <use :xlink:href="require('@/assets/image/icons/sprite.svg') + '#icon-' + nameIcon"></use>
  </svg>
</template>

<script>
export default {
    name: 'GSvg',
    props: {
        nameIcon: {
            type: String,
            required: true
        }
    }
};
</script>

<style></style>
