<template>
  <div id="app" class="d-flex justify-content-center align-items-center">
    <div class="card shadow p-4">
      <div class="card-body">
        <div class="header text-center">
          <h1>Weather App</h1>
          <div class="search-bar d-flex justify-content-center">
            <input
              type="text"
              v-model="city"
              placeholder="Enter City Name"
              class="search-input form-control"
              style="max-width: 300px;"
            />
            <button @click="searchByCity" class="search-button btn btn-primary ml-2">
              Search
            </button>
          </div>
        </div>

        <main v-if="weatherData" class="mt-4 text-center">
          <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <span>{{ weatherData.weather[0].description }}</span>
        </main>
      </div>
    </div>
  </div>
</template>

  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  
  const apikey = "b7b332d39e4688b8de85c92f7bc1973b";
  const city = ref('');
  const weatherData = ref(null);
  const temperature = computed(() => {
    return weatherData.value ? Math.floor(weatherData.value.main.temp - 273.15) : null;
  });
  
  const iconUrl = computed(() => {
    return weatherData.value
      ? `http://openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
      : null;
  });
  
  onMounted(() => {
    fetchCurrentLocationWeather();
  });
  
  async function fetchCurrentLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
        await fetchWeatherData(url);
      });
    }
  }
  
  async function fetchWeatherData(url: string) {
    try {
      const response = await axios.get(url);
      weatherData.value = response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  
  async function searchByCity() {
    if (city.value) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}`;
      await fetchWeatherData(url);
    }
  }
  </script>
  