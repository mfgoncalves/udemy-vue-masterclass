<template>
  <Accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="jobType in uniqueJobTypes"
            :key="jobType"
            class="w-1/2 h-8"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-2"
              :data-test="jobType"
              @change="selectJobType"
            />
            <label :for="jobType" data-test="job-type">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Accordion>
</template>

<script>
import Accordion from "@/components/Shared/Accordion.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { ADD_SELECTED_JOB_TYPES } from "@/store/constants";
import { useRouter } from "vue-router";
import { useUniqueJobTypes } from "@/store/composables";

export default {
  name: "JobFiltersSidebarJobTypes",
  components: { Accordion },
  setup() {
    const selectedJobTypes = ref([]);

    const uniqueJobTypes = useUniqueJobTypes();

    const store = useStore();
    const router = useRouter();

    const selectJobType = () => {
      store.commit(ADD_SELECTED_JOB_TYPES, selectedJobTypes.value);
      router.push({ name: "JobResults" });
    };

    return {
      uniqueJobTypes,
      selectJobType,
      ADD_SELECTED_JOB_TYPES,
      selectedJobTypes,
    };
  },
};
</script>
