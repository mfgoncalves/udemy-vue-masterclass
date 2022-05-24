<template>
  <Accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="w-1/2 h-8">
            <input id="vue-tube" type="checkbox" class="mr-3" />
            <label for="vue-tube">VueTube</label>
          </li>
          <li class="w-1/2 h-8">
            <input id="between-vue-and-me" type="checkbox" class="mr-3" />
            <label for="between-vue-and-me">Between vue</label>
          </li>
          <li class="w-1/2 h-8">
            <input id="et-vue-brute" type="checkbox" class="mr-3" />
            <label for="et-vue-brute">Et vue brute</label>
          </li>
          <li class="w-1/2 h-8">
            <input id="vue-and-a-half-men" type="checkbox" class="mr-3" />
            <label for="vue-and-a-half-men">Vue and a half men</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Accordion>
</template>

<script>
import Accordion from "@/components/Shared/Accordion.vue";

export default {
  name: "JobFiltersSidebarOrganizations",
  components: { Accordion },
};
</script>
