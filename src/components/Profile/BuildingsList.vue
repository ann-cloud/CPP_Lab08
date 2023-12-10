<template>
  <div class="buildings-list">
    <BuildingItem
      v-for="building in buildings"
      :key="building.id"
      :buildingNumber="building.number"
      :floors="building.floors"
      :rooms="building.rooms"
    />
  </div>
</template>

<script>
import BuildingItem from "./BuildingItem.vue";

export default {
  components: {
    BuildingItem,
  },
  name: 'BuildingListComponent',
  data() {
    return {
      buildings: [
        { id: 1, number: 1, floors: 3, rooms: 4 },
        { id: 2, number: 5, floors: 7, rooms: 20 },
        { id: 3, number: 2, floors: 2, rooms: 5 },
        { id: 4, number: 4, floors: 1, rooms: 3 },
        { id: 5, number: 3, floors: 2, rooms: 5 },
        { id: 6, number: 6, floors: 1, rooms: 2 },
      ],
    };
  },
  methods: {
    async getBuildingsOfUser()
    {
      
    }
  },
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
