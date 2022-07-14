<template>
  <div class="w-36">
    <Listbox v-model="selectedOption">
      <div class="relative mt-1">
        <ListboxButton style="height : 42px;"
          class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span class="block truncate">{{ optionListTitle }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions style="z-index : 99;"
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option.name"
              :value="option"
              :disabled="option.unavailable"
              as="template"
            >
              <li :class="[active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-10 pr-4',]">
                <span :class="[ selected ? 'font-medium' : 'font-normal', 'block truncate',]">
                {{ option.name }}
                </span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

const props = defineProps({
  options : {
    type : Object,
    required : true,
  },
  optionListTitle : {
    type : String,
    required : true
  }
})

// default option
const selectedOption = ref(props.options[0])

const emit = defineEmits(['changeOption'])

watch(() => selectedOption.value, (newVal, oldVal) => {
    return emit('changeOption', newVal)
  },
)

onMounted(() => {
    return emit('changeOption', selectedOption.value) 
})


</script>
