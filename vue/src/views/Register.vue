<template>
  <div>
    <div>
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Register for free
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ " " }}
        <router-link :to="{name: 'Login'}" class="font-medium text-indigo-600 hover:text-indigo-500">
          Login to your account
        </router-link>
      </p>
    </div>

    <!-- Form area -->
    <form class="mt-8 space-y-6" @submit="register">
    <!-- Show validation errors -->
    <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm relative">
      <span v-for="(field, i) of Object.keys(errors)" :key="i">
        <div v-for="(error, ind) of errors[field] || []" :key="ind">
          * {{ error }}
        </div>
      </span>
      <div class="absolute right-2 top-1">
         <span @click="errors = {} " class="h-8 w-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
      </div>
    </Alert>
    <div>
      
    </div>
    <!--/ Show validation errors -->
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
          <div>
          <label for="fullname" class="sr-only">Name</label>
          <input
            id="fullname"
            name="name"
            type="text"
            autocomplete="name"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Full name"
            v-model="user.name"
          />
        </div>
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            v-model="user.email"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            v-model="user.password"
          />
        </div>
        <div>
          <label for="password_confirmation" class="sr-only">Password Confirmation</label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autocomplete="current-password_confirmation"
            required=""
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password Confirmation"
            v-model="user.password_confirmation"
          />
        </div>
      </div> 

      <div>
        <button
          :disabled="loading"
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          :class="{'cursor-not-allowed' : loading, 'hover:bg-indigo-500': loading}"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sign Up
        </button>
      </div>
    </form>
    <!-- Form area -->
  </div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
import { useRouter } from "vue-router";
import store from "../store"
import Alert from "../components/Alert.vue";

const router = useRouter()

const user = {
  name : '',
  email : '',
  password: '',
  password_confirmation : ''
}

const loading = ref(false)
const errors = ref({})

const register = (e) => {
  e.preventDefault()

  loading.value = true;
  store.dispatch('register', user)
    .then((res) => {
      loading.value = false;
      // Kayıt başarılı ise dash. yönlendir
      router.push({ name : 'Dashboard' })
    })
    .catch(err => {
      loading.value = false;
      console.log(err)
      if(err.response.status === 422){
        errors.value = err.response.data.errors
      }
    })
}

</script>
