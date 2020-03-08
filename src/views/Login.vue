<template>
  <div class="login-container">
    <h2 class="login-title">Enter FPL Team ID</h2>
    <base-input
      class="team-id-input"
      placeholder="Team-ID"
    />
    <base-button
      class="submit-button"
      @click="submit()"
    >
      Check my team
    </base-button>
  </div>
</template>

<script>
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
export default {
  name: 'Login',
  components: {
    'base-input': BaseInput,
    'base-button': BaseButton
  },
  methods: {
    submit () {
      // do a test call to get the gameweek data or something to verify the team existens.
    }
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
    .submit-button {
      margin: $xxl 0;
    }
  }
</style>