<template>
  <PageComponent> 
    <template #header>
      <div class="flex justify-between items-center animate-fade-in-down">
            <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
            <router-link
            :to="{ name: 'SurveyCreate'}"
            class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"> 
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add New Survey
        </router-link>
      </div>
    </template>
    <!-- Content -->
    
    
    <!-- Surveys Actions -->
    <div v-if="surveys.data.length" class="flex flex-row lg:justify-between xl:justify-between">
     <div style="width: 32.50%;">
      <div class="animate-fade-in-down">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"></path>
            </svg>
          </div>
          <input type="text" v-model="search" tabindex="1" id="table-search" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-md 
          block pl-10 p-2.5 bg-white-700 text-gray focus:ring-indigo-300 md:w-full focus:border-indigo-300"
          placeholder="Search survey on page">
          </div> 
     </div>  
   </div>
   <div class="flex flex-row flex-nowrap">
   <ListBox :options="statusList" optionListTitle='Status' @changeOption="setStatus"/>
   <ListBox class="ml-3" :options="sortList" optionListTitle='Sort' @changeOption=""/>
   </div>
  </div>
   <!--/ Surveys Actions -->

    <div v-if="surveys.data.length" class="mb-4 mt-2 text-gray-700 text-sm lowercase"><span class="font-bold">{{ filterByTerm.length }}</span> results for {{ surveyStatus.name}} surveys on page</div>
    <Loading v-if="surveys.loading"/>
    <div v-else>
      <div class="grid grid-cols-1 gap-y-6 gap-5 sm:grid-cols-2 md:grid-cols-3 mt-3">
        <SurveyListItem 
        v-for="(survey, index) in filterByTerm"
        :key="survey.id"  
        :survey="survey"
        @delete="deleteSurvey(survey)" 
        class="opacity-0 animate-fade-in-down"
        :style="{animationDelay : `${index * 0.1}s`}"
        />
      </div>

      <div v-if="!filterByTerm.length && !errors && search" class="flex flex-col justify-center items-center border border-gray-200 w-full animate-fade-in-down overflow-hidden px-2" style="min-height: 408px">
        <h1 class="text-md font-medium">No Results Found</h1>
        <p class="text-sm font-light mt-2 block break-all px-10">Your search for "{{search}}" did not return any results.</p>
      </div>
    
      <div v-if="!surveys.data.length" class="flex items-center justify-center flex-col animate-fade-in-down">
        <div class="text-md font-weight">Your don't have surveys yet.</div>
        <router-link :to="{ name : 'SurveyCreate'}" class="hover:underline-offset-4 hover:underline hover:text-indigo-500">
        <p class="mt-1 text-indigo-500">
            Create one now →
        </p>
        </router-link>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-8 animate-fade-in-down" v-if="surveys.data.length">
        <nav class="relative z-0 inline-flex justify-center rounded-md shadow-sm" aria-label="Pagination">
          <a
            v-for="(link, i) in surveys.links"
            :key="i"
            :disabled="!link.url"
            v-html="link.label" 
            href="#"
            @click="getForPage($event, link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap bg-white"
            :class="[
              link.active
              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
             i === 0 ? 'rounded-l-md' : '',
             i === surveys.links.length -1 ? 'rounded-r-md' : ''
            ]"
          ></a>
        </nav>
      </div>
    </div>
    <div class="flex items-center justify-center font-semibold animate-fade-in-down" v-if="errors">Error! {{ errors }}</div>
  </PageComponent>
</template>   

<script setup> 
import store from "../store"
import { computed, ref, onMounted } from "vue"
import PageComponent from "../components/PageComponent.vue";
import SurveyListItem from "../components/SurveyListItem.vue";
import Loading from "../components/Loading.vue";
import ListBox from "../components/ListBox.vue";

const search = ref('')
const errors = ref('')
const surveyStatus = ref({})

const setStatus = (data) => {
 return surveyStatus.value = data
}

const statusList = [
  { id: 1, name: 'All', unavailable: false },
  { id: 2, name: 'Active', unavailable: false },
  { id: 3, name: 'Draft', unavailable: false },
]

const sortList = [
  { id: 1, name: 'Last created', unavailable: false },
  { id: 2, name: 'Last updated', unavailable: false },
  { id: 3, name: 'Name', unavailable: false },
]

const surveys = computed(() => store.state.surveys)

const filterByTerm = computed(() => {
  console.log(surveyStatus.value.name)
  return store.state.surveys.data.filter(data => {
    if(data.title.toLowerCase().includes(search.value.toLowerCase()) && surveyStatus.value.name === 'All'){
      return data.title.toLowerCase().includes(search.value.toLowerCase());
    } else if(data.title.toLowerCase().includes(search.value.toLowerCase()) && surveyStatus.value.name === 'Active'){
      return data.status === true && data.title.toLowerCase().includes(search.value.toLowerCase())
    } else if(data.title.toLowerCase().includes(search.value.toLowerCase()) && surveyStatus.value.name === 'Draft'){
      return data.status === false && data.title.toLowerCase().includes(search.value.toLowerCase())
    } else {
      return data.title.toLowerCase().includes(search.value.toLowerCase());
    }
  })
})


onMounted(() => {
  store.dispatch('getSurveys').then(() => {
  }).catch((error) => {
    if(error.response.status === 500){
      errors.value = 'Request failed. Try again.'
    } 
  });
})

const deleteSurvey = (survey) => {
  if(confirm('Are you sure you want to delete this survey?')){
   store.dispatch('deleteSurvey', survey.id)
    .then(() => {
      store.commit('notify', {
        type : 'success',
        message : 'Survey was successfully deleted'
      })
      // Get request call
      store.dispatch('getSurveys')
    })
    .catch((error) => {
      store.commit('notify', {
        type : 'error',
        message : 'Request failed. Try again.'
      })
    })
  }
}

// Reminder! Per page 10 surveys - back end..
const getForPage = (event, link) => {
  event.preventDefault()
  if(!link.url || link.active){
    return;
  }
  store.dispatch('getSurveys', { url: link.url })
}

</script>

<style scoped>


</style> 
