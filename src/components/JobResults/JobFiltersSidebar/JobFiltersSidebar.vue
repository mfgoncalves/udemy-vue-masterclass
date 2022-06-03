<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear filters" type="secondary" />
        </div>
      </div>
      <JobFiltersSidebarCheckboxGroup
        header="Organizations"
        :mutation="ADD_SELECTED_ORGANIZATIONS"
        :unique-values="uniqueOrganizations"
        data-test="organizations-filter"
      />
      <JobFiltersSidebarCheckboxGroup
        header="Job Types"
        :mutation="ADD_SELECTED_JOB_TYPES"
        :unique-values="uniqueJobTypes"
        data-test="job-types-filter"
      />
    </section>
  </div>
</template>

<script lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";
import { useUniqueJobTypes, useUniqueOrganizations } from "@/store/composables";
import {
  ADD_SELECTED_ORGANIZATIONS,
  ADD_SELECTED_JOB_TYPES,
} from "@/store/constants";
import { defineComponent } from "vue";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    ActionButton,
    JobFiltersSidebarCheckboxGroup,
  },
  setup() {
    const uniqueOrganizations = useUniqueOrganizations();
    const uniqueJobTypes = useUniqueJobTypes();

    return {
      uniqueOrganizations,
      uniqueJobTypes,
      ADD_SELECTED_JOB_TYPES,
      ADD_SELECTED_ORGANIZATIONS,
    };
  },
});
</script>
