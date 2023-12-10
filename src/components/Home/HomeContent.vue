<template>
  <div class="content-container">
    <h1>Welcome to our security system simulation!</h1>
    <div class="content-flex-container">
      <div class="content-image">
        <img src="@/assets/img/securityGuy.png" alt="Security Officer">
      </div>
      <div class="content-description">
        <p>Here you have a <strong>unique opportunity</strong> to feel yourself in the role of the head of a security firm, assessing the real challenges and solutions that security professionals face every day.</p>
        <p>Thanks to advanced simulation technologies, you will see the consequences of your actions in real time, adapting to the changing environment in time.</p>
        <p>Take control, develop tactics and strategies, and improve your skills as a security firm manager with us.</p>
        <p>Join us and become part of the exciting world of security business.</p>
      </div>
    </div>
    <h3>Your security understanding and mastery starts here!</h3>
    <ButtonGoToSimulation />
  </div>
</template>

<script>
import ButtonGoToSimulation from './ButtonGoToSimulation.vue';
export default {
  name: 'HomeContentComponent',
  components: {
    ButtonGoToSimulation
}
}
</script>

<style scoped>

.content-container {
  text-align: center;
  font-family: Arial, sans-serif;
  margin-top: 50px;
}

.content-flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

.content-description {
  margin-left: 20px; /* Add margin to separate image and text */
  max-width: 600px; /* Adjust the max-width as needed */
  text-align: left;
  color: black;
}

.content-image {
  margin-right: 20px; /* Add margin to separate image and text */
}

</style>
