<template>
    <div class="building-scheme">
        <div id="app">

            <div v-for="apartment in buildingApartments" :key="apartment.id"
                :class="{ 'user-apartment': apartment.isUsersApartments }" class="apartment">
                <label v-if="apartment.isUsersApartments">Curent User </label>
                <label>Apartment</label>
                <div v-for="floor in apartment.sortedFloors" :key="floor.number" class="floor">
                    <label>Floor {{ floor.number }}</label>
                    <br />
                    <div v-for="room in floor.rooms" :key="room.id" class="room">
                        <div class="window-container">
                            <div v-for="door in Array.from({ length: room.amountOfDoors })" :key="door" class="door"></div>
                        </div>
                        <div class="window-container">
                            <div v-for="window in Array.from({ length: room.amountOfWindows })" :key="window"
                                class="window">
                            </div>
                        </div>
                        
                        <div class="window-container">
                            <div class="sensor" v-for="sensor in room.sensorsForRoom" :key="sensor.id" :class="{ 'sensor-work': sensor.isViolationDetected }">
                            </div>
                        </div>

                    </div>
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
        },
    }
};
</script>

<style scoped>
.apartment {
    background-color: rgb(14, 88, 44);
    margin-right: 20px;
    margin-bottom: 2%;
    color: azure;
}

.user-apartment {
    background-color: rgb(179, 20, 20) !important;
}

.apartment label {
    width: 15%;
}

.floor {
    background-color: rgb(37, 37, 37);
    border: 5px solid rgb(206, 103, 0);
    color: azure;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15vh;
}

.room {
    width: 50px;
    height: 50px;
    background-color: rgb(201, 201, 201);
    border: 1px solid #ccc;
    margin-right: 10px;
    display: flex;
    flex-grow: 1;
    height: 12vh;
    flex-wrap: nowrap;
    flex-direction: left;
    padding: 5px;
}

.door {
    width: 10%;
    height: 80%;
    background-color: rgb(66, 28, 28);
    /* doors */
    margin-right: 5px;
    margin-bottom: 5px;
    display: inline-block;
}

.window {
    width: 10%;
    height: 30%;
    background-color: rgb(112, 184, 208);
    margin: 5px;
    display: inline-block;
}

.sensor {
    width: 1vh;
    height: 1vh;
    background-color: rgb(0, 92, 0);
    margin: 2px;
    display: inline-block;
}

.sensor-work {
    background-color: rgb(255, 0, 0) !important;
}

.window-container {
    width: 33%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}
</style>