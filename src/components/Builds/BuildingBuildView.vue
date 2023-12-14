<template>
    <div class="building-scheme">
        <div id="app">

            <div v-for="apartment in buildingApartments" :key="apartment.name" class="apartment">
                <label>Apartment {{ apartment.id }}</label>
                <div v-for="floor in apartment.floors" :key="floor.number" class="floor">
                    <label>Floor {{ floor.number }}</label>
                    <br/>
                    <div v-for="room in floor.rooms" :key="room.name" class="room"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'BuildingBuildView',
    props: {
        buildingApartments: {
            type: Array,
            required: true,
        }
    }
}
</script>

<style scoped>
.apartment {
    background-color: rgb(14, 88, 44);
    margin-right: 20px;
    margin-bottom: 10%;
    color: azure;
}

.apartment label {
    margin: 5px;
}

.floor {
    background-color: rgb(37, 37, 37);
    border: 5px solid rgb(206, 103, 0);
    color: azure;
}

.room {
    width: 50px;
    height: 50px;
    background-color: rgb(201, 201, 201);
    border: 1px solid #ccc;
    margin-right: 10px;
    display: inline-block;
}

.window {
    width: 50px;
    height: 50px;
    background-color: lightblue;
    border: 1px solid #ccc;
    margin-right: 10px;
    display: inline-block;
}
</style>