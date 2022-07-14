<template>
<div class="fixed left-4 bottom-4">
    <div v-if="notification.show"
        class="flex w-[310px] max-w-max py-3 px-3 text-white animate-fade-in-down float-left"
        :class="notificationTypeCheck">
        <svg v-if="notification.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-if="notification.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-if="notification.type === 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>{{ notification.message }}</span>
    </div>
</div>
</template>

<script setup>

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const notification = computed(() => store.state.notification)

const notificationTypeCheck = computed(() => {
    if(store.state.notification.type === 'success') return 'bg-emerald-500'
    else if (store.state.notification.type === 'warning') return 'bg-yellow-500'
    else return 'bg-red-500'
})

</script>

<style>

</style>