<template>
  <PageComponent>
    <template #header>
      <div class="flex items-center justify-between animate-fade-in-down">
        <h1 class="text-3xl font-bold text-gray-900 relative">
          {{ route.params.id ? model.title : "Create New Survey" }}
          <span
          v-if="model.id"
          style="padding-top: 0.1em; padding-bottom: 0.1rem"
          class="text-xs px-3 absolute ml-1 mt-1"
          :class="[ model.status ? 'bg-green-200 text-green-800 rounded-full' : 'bg-red-200 text-red-800 rounded-full' ]" >
          {{ model.status ? 'Active' : 'Draft' }}
          </span>
        </h1>
        <div class="flex">
          <a v-if="model.id" :href="`/view/survey/${model.slug}`" target="_blank" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          View Public link
          </a>
          <button
          v-if="route.params.id"
          type="button"
          @click="deleteSurvey()"
          class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-700"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mt-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          Delete Survey
          </button>
        </div>
      </div>
    </template>
     <pre>{{ model }}</pre> 
    <Loading v-if="surveyLoading" />
    <form v-else @submit.prevent="saveSurvey" class="animate-fade-in-down">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!-- image -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image_url"
                :src="model.image_url"
                :alt="model.title"
                loading="lazy"
                class="w-64 h-48 object-cover rounded-md"
              />
              
              <!-- Yeni anket oluşturulacak ise -->
              <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                </svg>
              </span>
              <button
              type="button"
              class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <input type="file" @change="onImageChoose" class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer">
                {{ route.params.id ? 'Change' : 'Choose Image'}}
              </button>
              <button
              type="button"
              @click="removeImage()"
              :disabled="!model.image_url"
              class="text-white ml-3 bg-red-500 py-2 px-3 disabled:opacity-70 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium hover:bg-red-700 focus:outline-none"
              >
              Remove
              </button>
            </div>
          </div>
          <!--/ image -->

          <!-- title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
            type="text"
            name="title"
            id="title"
            v-model="model.title"
            autocomplete="survey_title"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <!--/ title -->

          <!-- description -->
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <textarea
              name="description" 
              id="description"
              rows="5"
              v-model="model.description"
              autocomplete="survey_description"
              class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Describe your survey"
              ></textarea>
              <label v-if="model.description" class="float-right mt-1 text-sm">{{ model.description.length }}</label>
            </div>
          </div>
          <!--/ description -->

          <!-- expire date -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700 animate-fade-in-down">
          <div>
            <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
            <input 
            type="date"
            name="expire_date"
            id="expire_date"
            v-model="model.expire_date"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-gray-300 rounded-md w-full cursor-pointer"
            >
          </div>
          <!--/ expire date -->

           <div v-if="model.created_at">
            <label for="created_at" class="block text-sm font-medium text-gray-700">Create Date</label>
            <input 
            type="datetime-local"
            name="created_at"
            id="created_at"
            v-model="model.created_at"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-gray-300 rounded-md w-full disabled:cursor-not-allowed" 
            disabled
            />
          </div>
           <div v-if="model.updated_at">
            <label for="updated_at" class="block text-sm font-medium text-gray-700">Updated Date</label>
            <input 
            type="datetime-local"
            name="updated_at"
            id="updated_at"
            v-model="model.updated_at"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm border-gray-300 rounded-md w-full disabled:cursor-not-allowed"
            disabled
            />
          </div>
          </div>

          <!-- status -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input 
              id="status"
              type="checkbox"
              name="status" 
              v-model="model.status"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              >
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700">Active</label>
            </div>
          </div>
          <!--/ status -->
        </div>

         <!-- survey fields -->
         <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <h3 class="text-2xl font-semibold flex items-center justify-between">
              Questions
              
              <!-- Add new question -->
              <button
              type="button"
              @click="addQuestion()"
              class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
              >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
              </svg>
              New Add Question
              </button>
              <!-- /Add new question -->
              </h3>
              <div v-if="!model.questions.length" class="flex justify-center items-center flex-col">
                <img
                src="../assets/survey-photo.webp"
                class="w-64 h-48 object-cover rounded-md mt-3"/>
                <span class="mt-4 text-gray-600">You don't have any questions created.</span>
              </div>
              
              <!-- for questions -->
              <div v-for="(question, index) in model.questions" :key="question.id">
                <QuestionEditor 
                :class="{questionArea : question.draft}"
                :question="question"
                :index="index"
                @change="questionChange"
                @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion"
                />
              </div>
              <!-- /for questions -->
         </div>
        

        <!--/ survey fields -->

        <!-- survey actions -->
          <div class="px-4 py-3 bg-gray-50 flex justify-between sm:px-6">
              <button
                :disabled="!route.params.id"
                type="button"
                @click="clearInput()"
                class="clearInput inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70" 
                > 
                Clear
              </button>
            <div class="flex">
              <router-link
                :to="{ name : 'Surveys' }"
                class="inline-flex mr-2 justify-center py-2 px-4 border-transparent shadow-sm text-sm border border-gray-400 font-semibold bg-white rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                > 
                Cancel
              </router-link>
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                > 
                Save
              </button>
          </div>
         </div>
        <!-- survey actions -->

      </div> 
    </form>
  </PageComponent>
</template>

<script setup>
import { v4 as uuidv4} from "uuid"
import store from '../store'
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';

import QuestionEditor from "../components/editor/QuestionEditor.vue";
import PageComponent from "../components/PageComponent.vue";
import Loading from "../components/Loading.vue";

const router = useRouter()
const route = useRoute()

const surveyLoading = computed(() => store.state.currentSurvey.loading)

// Create empty survey
let model = ref({
  title: "",
  slug: "",
  status: false,
  description: null,
  image: null,
  image_url: null,
  expire_date: null,
  questions: [],
});

// Statedeki currentSurvey verilerinin değişimini izler ve değişiklik olduğunda güncellenir.
watch(() => store.state.currentSurvey.data, (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status : !!newVal.status
    }
  },
)

 watch(() => 
 
   [model.value.title, model.value.description, model.value.status, model.value.image, model.value.expire_date, model.value.questions],
   (newVal, oldVal) => {

    if(!route.params.id){
      const btn = document.querySelector('.clearInput');
      btn.removeAttribute('disabled');
    }
 })


// survey id
if(route.params.id){
  store.dispatch('getSurvey', route.params.id)
}

const onImageChoose = (e) => {
  const file = e.target.files[0]

  const reader = new FileReader()

  reader.onload = () => {
    model.value.image = reader.result

    model.value.image_url = reader.result
  }

  reader.readAsDataURL(file)

}

const addQuestion = (index) => {
  const newQuestion = {
     id : uuidv4(),
     type : 'text',
     question : '',
     description : null,
     data : {},
     draft : true
  }
  
  // Question add
  model.value.questions.splice(index, 0, newQuestion)
}

const deleteQuestion = (question) => {
  model.value.questions = model.value.questions.filter((q) => q.id !== question.id)
}

const questionChange = (question) => {
  model.value.questions = model.value.questions.map((q) => {
    if(q.id === question.id){
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  })
}

// Create or Update Survey
const saveSurvey = () => {
  store.dispatch('saveSurvey', model.value).then(({ data }) => {

    if(!route.params.id){
      store.commit('notify', {
        type : 'success',
        message : 'Survey was successfully created'
      })
    } else {
      store.commit('notify', {
        type : 'success',
        message : 'Survey was successfully updated'
      })
    }
    
    router.push({
      name : 'SurveyView',
      params : { id: data.data.id }
    })
  })
  .catch((error) => {
      store.commit('notify', {
        type : 'warning',
        message : error
      })
      
    })
}

const deleteSurvey = () => {
  if(confirm('Are you sure you want to delete this survey?')){
    store.dispatch('deleteSurvey', model.value.id).then(() => {
      store.commit('notify', {
        type : 'success',
        message : 'Survey was successfully created'
      })
      router.push({ name : 'Surveys' })
    })
  .catch((error) => {
      store.commit('notify', {
        type : 'error',
        message : 'Request failed. Try again.'
      })
    })
  }
}

const clearInput = () => {
  if(confirm('Are you sure you want to clear this survey?')){
    
    if(route.params.id) {
      model.value = {
        id : parseInt(route.params.id),
        title : "",
        status : false,
        description : null,
        image : null,
        expire_date : null,
        questions : [],
      }
    } else {
        model.value = {
          title : "",
          status : false,
          description : null,
          image : null,
          expire_date : null,
          questions : [],
      }
    }
  }
}

const removeImage = () => {
   model.value.image = ''
   model.value.image_url = ''

   store.commit('notify', {
        type : 'success',
        message : 'Survey image successfully deleted'
   })
}

</script>

<style scoped>

.questionArea{
  --angle: 0deg;
  border: 2px solid;
  border-image: linear-gradient(var(--angle), #020024, #090979, #8200ff ) 1;
  animation: 5s rotate linear infinite;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

</style>
