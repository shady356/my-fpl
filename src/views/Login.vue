<template>
  <div class="login-container">
    <h2 class="login-title">Enter FPL Team ID</h2>
    <base-input
      class="team-id-input"
      placeholder="Team-ID"
    />
  </div>
</template>

<script>
import BaseInput from '@/components/base/BaseInput.vue'
export default {
  name: 'Login',
  components: {
    'base-input': BaseInput
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    margin: $s;
    display: flex;
    align-items: center;
    flex-direction: column;

    .login-title {
      margin: $xl 0 $s;
    }

    .team-id-input {
      margin: $m 0;
    }
  }
</style>