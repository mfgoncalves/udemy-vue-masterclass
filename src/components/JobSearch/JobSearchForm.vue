<template>
  <form
    class="flex items-center w-full h-12 mt-14 border border-solid border-brand-gray-3 rounded-3xl"
    @submit.prevent="searchForJobs"
  >
    <FontAwesomeIcon class="ml-4 mr-3" :icon="['fas', 'search']" />
    <div class="flex flex-nowrap flex-1 h-full text-base font-light">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label for="role-text-input" class="absolute left-0 -top-10"
          >Role</label
        >
        <TextInput
          id="role-text-input"
          v-model="role"
          placeholder="Software engineer"
          data-test="role-input"
        />
      </div>
    </div>

    <span
      class="flex items-center h-full px-3 border-l border-r border-brand-gray-3 bg-brand-gray-2"
      >in</span
    >

    <div class="relative flex items-center flex-1 h-full pl-3">
      <label for="location-text-input" class="absolute left-0 -top-10"
        >Where?</label
      >
      <TextInput
        id="location-text-input"
        v-model="location"
        placeholder="Los Angeles"
        data-test="location-input"
      />
    </div>

    <ActionButton
      text="Search"
      type="secondary"
      class="rounded-r-3xl"
      data-test="form-submit-button"
    />
  </form>
</template>

<script lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "JobSearchForm",
  components: {
    ActionButton,
    TextInput,
  },
  setup() {
    const role = ref("");
    const location = ref("");

    const router = useRouter();

    const searchForJobs = () => {
      router.push({
        name: "JobResults",
        query: {
          role: role.value,
          location: location.value,
        },
      });
    };

    return {
      role,
      location,
      searchForJobs,
    };
  },
});
</script>
