<template>
  <div class="index">
    <app-header>
        睡么
    </app-header>
    <div class="circle"></div>
  </div>
</template>
<script>
import AppHeader from '../components/AppHeader';

export default {
    components: {
        AppHeader,
    },
    data() {
        return {
        };
    },
};
</script>

<style scoped>
@import "../style/postcss/_var.css";

h1, h2 {
    font-weight: normal;
    color: $text_color;
}
.circle{
    @util center;
    @util circle(5rem,#00ff00);
}


</style>
