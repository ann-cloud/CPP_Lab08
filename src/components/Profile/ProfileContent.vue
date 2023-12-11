<template>
  <div class="profile-content">
    <div class="add-building-btn">
      <button @click="showModal = true">Add building</button>
    </div>
    <div class="user-content">
      <div class="user-info">
        <h2>Information about user</h2>
        <div class="info-group">
            <p><strong>Email:</strong></p> 
            <p>{{username}}</p> 
        </div>
        <div class="info-group">
            <p><strong>Phone number:</strong></p> 
            <p>123456789</p> 
        </div>
        <div class="info-group">
            <p><strong>Number of buildings:</strong></p> 
            <p>5</p>
        </div>
      </div>
      <BuildingsList />
      <AddBuildingModal v-if="showModal" @closeAddModal="showModal = false"/>
    </div>
  </div>
</template>

<script>
import BuildingsList from './BuildingsList.vue';
import AddBuildingModal from './AddBuildingModal.vue';

export default {
  components: {
    BuildingsList,
    AddBuildingModal
  },
  name: 'ProfileContentComponent',
  data() {
    return {
      username: this.$store.getters.getUsername,
      phone: '',
      numberOfBuildings: '',
      showModal: false,
    }
  },
};
</script>

<style scoped>

.user-content
{
  display: flex;
  justify-content: space-between;
}
.add-building-btn
{
  display: flex;
  justify-content: flex-end;
  padding: 40px 60px;
}

.add-building-btn button
{
  background-color: #417B5A;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px 30px;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.add-building-btn button:hover {
  background-color: #45a049;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Shadow on hover */
}
.info-group
{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  font-size: large;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.user-info {
  background-color: #9197AE;
  border-radius: 5px;
  padding: 20px 40px;
  width: 100%;
  max-width: 300px; 
  margin: 0px 60px; 
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.user-info h2 {
  text-align: center;
  color: #ffffff;
  margin-bottom: 15px;
}

</style>
