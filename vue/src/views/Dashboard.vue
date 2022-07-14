<template>
  <PageComponent title="Dashboard">
    <div v-if="errors" class="flex items-center justify-center font-semibold mb-5">Error! {{ errors }}</div>
    <pre v-if="false">{{ data }}</pre>
    <Loading v-if="loading" />
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700 animate-fade-in-down">
      <div style="animation-delay : 0.1s" class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2 animate-fade-in-down">
        <h3 class="text-2xl font-semibold">Total Surveys</h3>
        <div class="text-8xl font-semibold flex-1 flex items-center justify-center">
          {{ data.totalSurveys || 0 }} 
        </div>
      </div>
      <div style="animation-delay : 0.2s" class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down">
        <h3 class="text-2xl font-semibold">Total Answers</h3>
        <div class="text-8xl font-semi  bold flex-1 flex items-center justify-center">
          {{ data.totalAnswers || 0 }}
        </div>
      </div>
      <div style="animation-delay : 0.3s" class="row-span-2 order-3 bg-white shadow-md p-4 lg:order-1 animate-fade-in-down">
        <h3 class="text-2xl font-semibold">Latest Survey</h3>
      <div v-if="data.latestSurvey">
        <img loading="lazy" v-lazy="data.latestSurvey.image_url || 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'" class="w-[240px] min-height-12 mx-auto" >
        <h3 class="font-bold text-xl mb-3">{{ data.latestSurvey.title }}</h3>
        <div class="flex justify-between text-sm mb-1">
          <div>Create Date</div>
          <div>{{ data.latestSurvey.created_at }}</div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>Expire Date</div>
          <div>{{ data.latestSurvey.expire_date }}</div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>Status</div>
          <div>{{ data.latestSurvey.status ? 'Active' : 'Draft' }}</div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>Questions</div>
          <div>{{ data.latestSurvey.questions }}</div>
        </div>
        <div class="flex justify-between text-sm mb-3">
          <div>Answers</div>
          <div>{{ data.latestSurvey.answers }}</div>
        </div>
        <div class="flex justify-between">
          <router-link :to="{ name : 'SurveyView', params : { id : data.latestSurvey.id } }" class="flex -ml-4 py-2 px-2 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
               <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Survey
          </router-link>
          <button class="flex -ml-4 py-2 px-2 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Answers
          </button>
        </div>
      </div>
      <div v-else class="text-gray-600 text-center py-16">
          Your don't have surveys yet
      </div>
      </div>
       <div style="animation-delay : 0.4s" class="row-span-2 order-4 bg-white shadow-md p-3 lg:order-3 animate-fade-in-down">
          <div class="flex justify-between items-center mb-3 px-2">
            <h3 class="text-2xl font-semibold">Latest Answers</h3>
              <a href="javascript:void(0)" class="text-sm text-blue-500 hover:decoration-blue-500">
                View all
              </a>
          </div>
          <div v-if="data.latestAnswers">
            <router-link :to="{ name : 'SurveyView', params : { id : answer.survey.id } }"  v-for="answer of data.latestAnswers" :key="answer.id" class="block p-2 hover:bg-gray-100/90">
              <div class="font-semibold">{{ answer.survey.title }}</div>
              <small>
                Answer Made at:
               <i class="font-semibold"> {{ answer.end_date }}</i>
              </small>
            </router-link>
          </div>
          <div v-else class="text-gray-600 text-center py-16">
          Your don't have answers yet
        </div>  
       </div>
    </div>

  </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";  
import Loading from "../components/Loading.vue";

import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore()
const errors = ref('')


const loading = computed(() => store.state.dashboard.loading)
const data = computed(() => store.state.dashboard.data)

store.dispatch('getDashboardData')
  .catch(function (error) {
    if(error.response.status === 500 || error.response.status === 0){
      errors.value = 'Request failed. Try again.'
    }
  });


</script>

<style scoped>

.min-height-12{
  min-height: 12rem;
}

</style>
