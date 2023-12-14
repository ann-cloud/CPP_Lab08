<template>
  <div class="buildings-list">
    <BuildingItem
      v-for="building in buildings"
      :key="building.id"
      :buildingNumber="building.id"
      :floorsCount="building.apartments.reduce((sum, apartment) => sum + apartment.floors.length, 0)"
    />
  </div>
</template>

<script>
import BuildingItem from "./BuildingItem.vue";
import axios from 'axios';

export default {
  components: {
    BuildingItem,
  },
  name: 'BuildingListComponent',
  data() {
    return {
      buildings: [],
    };
  },
  methods: {
    async getBuildingsOfUser()
    {
      try {    
        const userId = this.$store.getters.getUserId;
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        const response = await axios.get('http://localhost:8080/api/auth/users');

        const user = response.data.find(user => user.id === userId);

        this.buildings = user.buildings;
      } catch (error) {
        alert('Building fetch failed!');
        console.error('Error fetching buildings:', error.response.data.message);
      }
    }
  },
  created() {
    this.getBuildingsOfUser();
  }
};
</script>

<style scoped>
.buildings-list {
  background-color: #9197AE;
  border-radius: 5px;
  padding: 40px;
  width: 100%;
  max-width: 700px;
  margin-right: 60px;
  max-height: 400px;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}


</style>
