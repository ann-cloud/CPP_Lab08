<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-background" @click="close"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h3>Add/Edit building form</h3>
        <button class="close-btn" @click="close">×</button>
      </div>
      <div class="modal-body">
        <ApartmentComponent v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" />
        <button @click="addApartment">Add apartment</button>
      </div>
    </div>
  </div>
</template>

<script>
import ApartmentComponent from './ApartmentComponent.vue';

export default {
  components: {
    ApartmentComponent
  },
  data() {
    return {
      isVisible: true,
      apartments: []
    };
  },
  methods: {
    close() {
      this.isVisible = false;
    },
    addApartment() {
      const newApartment = {
        id: this.apartments.length + 1,
        name: `Apartment ${this.apartments.length + 1}`,
        address: 'New Address',
        floors: []
      };
      this.apartments.push(newApartment);
    }
  }
};
</script>

<style scoped>
</style>
