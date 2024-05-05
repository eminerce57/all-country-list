
<script setup>
import { reactive, ref,onMounted } from "vue";
import CountryServices from "@/service/CountryService";
const CountryService = new CountryServices();

onMounted(()=>{
  CountryService.GetCountries()
})




</script>
<template>
  <div class="body" @mousemove="handleMouseMove">
    <Card style="width: 65rem; overflow: hidden">
      <template #header> </template>
      <template #title>
        <div class="flex justify-content-between">
          <strong>All Country List</strong>
    
        </div>
      </template>
    
      <template #content>
    <div class="grid">

    </div>
      </template>
      <template #footer> </template>
    </Card>
  </div>
</template>

<style></style>
