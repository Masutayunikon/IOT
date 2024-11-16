<script setup lang="ts">
interface Sensor {
  id:          number;
  token:       string;
  name:        string;
  description: string;
  tags:        any[];
  dataPoint:   DataPoint[];
  date:        Date;
}

interface DataPoint {
  id:    number;
  date:  string;
  dataF: string;
  dataI: number;
  dataS: DataS;
}

enum DataS {
  Humidity = "Humidity",
  LightLevel = "LightLevel",
  Temperature = "Temperature",
}

const Props = defineProps<{
  sensor: Sensor;
}>()

const lastHumidity = ref<string | number | null>(0);
const lastLightLevel = ref<string | number | null>(0);
const lastTemperature = ref<string | number | null>(0);

const lastHumidityTemp = Props.sensor.dataPoint.filter((dataPoint) => dataPoint.dataS === DataS.Humidity).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
lastHumidity.value = lastHumidityTemp.length > 0 && lastHumidityTemp[lastHumidityTemp.length - 1] ? lastHumidityTemp[lastHumidityTemp.length - 1].dataI ?? lastHumidityTemp[lastHumidityTemp.length - 1].dataF : null;
const lastLightLevelTemp = Props.sensor.dataPoint.filter((dataPoint) => dataPoint.dataS === DataS.LightLevel).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
lastLightLevel.value = lastLightLevelTemp.length > 0 && lastLightLevelTemp[lastLightLevelTemp.length - 1] ? lastLightLevelTemp[lastLightLevelTemp.length - 1].dataI ?? lastLightLevelTemp[lastLightLevelTemp.length - 1].dataF : null;
const lastTemperatureTemp = Props.sensor.dataPoint.filter((dataPoint) => dataPoint.dataS === DataS.Temperature).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
lastTemperature.value = lastTemperatureTemp.length > 0 && lastTemperatureTemp[lastTemperatureTemp.length - 1] ? lastTemperatureTemp[lastTemperatureTemp.length - 1].dataI ?? lastTemperatureTemp[lastTemperatureTemp.length - 1].dataF : null;

const getLuxSvg = (lux: number | string | null) => {

  if (lux === null) {
    return "sun-sunrise-svgrepo-com.svg";
  }

  // convert lux to number
  lux = Number(lux);

  if (lux < 100) {
    return "moon-and-stars-svgrepo-com.svg";
  } else if (lux < 200) {
    return "cloudy-cloud-svgrepo-com.svg";
  } else if (lux < 2000) {
    return "sun-cloudy-svgrepo-com.svg";
  } else {
    return "sun-sunrise-svgrepo-com.svg";
  }
}

</script>

<template>
  <div class="w-full p-4">
    <div class="text-black hover:bg-gray-300 hover:cursor-pointer bg-gray-200 backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 rounded-xl p-4 flex">
      <div class="max-w-1/2 overflow-hidden">
        <p class="text-lg font-semibold overflow-hidden whitespace-nowrap text-ellipsis">{{ Props.sensor.name }}</p>
        <p class="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{{ Props.sensor.description }}</p>
      </div>
      <div class="ml-auto flex gap-4 w-auto flex-wrap">
        <div class="w-12">
          <img src="/humidity-svgrepo-com.svg" alt="humidity" class="w-8 h-8" />
          <p class="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{{ lastHumidity ?? "N/A" }}%</p>
        </div>
        <div class="w-12">
          <img src="/temperatures-heat-svgrepo-com.svg" alt="temperature" class="w-8 h-8" />
          <p class="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{{ lastTemperature ?? "N/A"  }}°C</p>
        </div>
        <div class="w-12">
          <img :src="`/${getLuxSvg(lastLightLevel)}`" alt="light level" class="w-8 h-8" />
          <p class="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{{ lastLightLevel ?? "N/A" }} lux</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
