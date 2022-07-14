<template>
  <div class="py-5 px-8">
    <div v-if="loading" class="flex justify-center">Loading...</div>
    <form
      @submit.prevent="submitSurvey"
      v-else
      class="container mx-auto">
        <div class="grid grid-cols-6 items-center">
            <div class="mr-4">
                <img :src="survey.image_url" alt="">
            </div>
            <div class="col-span-5">
                <h1 class="text-3xl mb-3">{{ survey.title }}</h1>
                <p class="text-gray-500 text-sm" v-html="survey.description"></p>
            </div>
        </div>
        
        <div v-if="surveyFinished" class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto">
            <div class="text-xl mb-3 font-semibold">Thank you for participating in this survey.</div>
            <button type="button" @click="submitAnotherResponse" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit another response
            </button>
        </div>

        <div v-else>
            <hr class="my-3">
            <div v-for="(question, ind) in survey.questions" :key="question.id">
                <QuestionViewer 
                    v-model="answers[question.id]"
                    :question="question"
                    :index="ind"
                />
            </div>

            <div v-if="!survey.question" class="text-center">No questions have been added yet.</div>

            <button :disabled="!survey.question" type="submit" class="disabled:opacity-70 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
            </button>
        </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import QuestionViewer from '../components/viewer/QuestionViewer.vue';

const route = useRoute()
const store = useStore()

const loading = computed(() => store.state.currentSurvey.loading)
const survey = computed(() => store.state.currentSurvey.data)

const surveyFinished = ref(false)

// QuestionID and answers..
const answers = ref({})

store.dispatch('getSurveyBySlug', route.params.slug)

const submitSurvey = () => {
    store.dispatch('saveSurveyAnswer', {
        surveyId : survey.value.id, 
        answers : answers.value
    })
    .then((response) => {
        if(response.status === 201){
            surveyFinished.value = true
        }
    })
}

const submitAnotherResponse = () => {
    answers.value = {}
    surveyFinished.value = false
}

</script>

<style></style>
