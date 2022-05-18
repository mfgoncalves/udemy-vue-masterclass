<template>
  <form
    class="flex items-center w-full h-12 mt-14 border border-solid border-brand-gray-3 rounded-3xl"
  >
    <FontAwesomeIcon class="ml-4 mr-3" :icon="['fas', 'search']" />
    <div class="flex flex-nowrap flex-1 h-full text-base font-light">
      <div class="relative flex items-center flex-1 h-full pr-3">
        <label for="role-text-input" class="absolute left-0 -top-10"
          >Role</label
        >
        <input
          id="role-text-input"
          v-model="role"
          name="role"
          type="text"
          placeholder="Software engineer"
          class="w-full text-lg font-normal focus:outline-none"
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
      <input
        id="location-text-input"
        v-model="location"
        name="location"
        type="text"
        placeholder="Los Angeles"
        class="w-full text-lg font-normal focus:outline-none"
      />
    </div>

    <ActionButton text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";

export default {
  name: "JobSearchForm",
  components: {
    ActionButton,
  },
  data() {
    return {
      role: "",
      location: "",
    };
  },
};
</script>
