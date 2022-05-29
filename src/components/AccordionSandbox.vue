<script lang="ts" setup>
  import AccordionList from "./accordion/AccordionList.vue";
  import AccordionItem from "./accordion/AccordionItem.vue";
  import { computed, ref } from "vue";

  const state = ref<Record<string, boolean>>({});
  const contentLines = ref<string[]>([]);
  const dynamicItems = ref<string[]>([]);
  const openMultipleItems = ref(false);
  const accordionBlockWidthPercents = ref(100);

  function addContentLine() {
    contentLines.value.push("Date now is " + Date.now());
  }
  function removeContentLine() {
    contentLines.value.pop();
  }

  function addDynamicItem() {
    dynamicItems.value.push("Date now is " + Date.now());
  }
  function removeDynamicItem() {
    dynamicItems.value.pop();
  }

  function onStateControllerChange(key: string, event: Event) {
    const newValue = !!(event.target as HTMLInputElement).checked || false;
    state.value[key] = newValue;
  }

  const vModelItems = computed(() => {
    return Object.entries(state.value);
  });
</script>

<template>
  <div class="adv">
    <div class="image">🪗</div>
    <ul>
      <li>SSR friendly</li>
      <li>Block resize friendly</li>
      <li>v-model controlled</li>
      <li>Default-open feature</li>
      <li>Dynamic content reaction</li>
      <li>Dynamic items allowed</li>
      <li>Animated (optional, controlled by css)</li>
      <li>Exclude closed item's content from tab loop</li>
      <li>All content is provided by slots</li>
      <li>Css fully customizable</li>
    </ul>
  </div>
  <div class="sandbox">
    <div class="accordion-block" :style="{ width: accordionBlockWidthPercents + '%' }">
      <AccordionList v-model:state="state" :open-multiple-items="openMultipleItems">
        <AccordionItem id="mId1" default-opened>
          <template #summary> Summary one</template>
          <template #icon>☝️</template>
          <h3>Dynamic content reaction</h3>
          <div>
            <button @click="addContentLine">Add dynamic lines</button>
            <button @click="removeContentLine">Remove dynamic lines</button>
          </div>
          <div v-for="(line, index) in contentLines" :key="index">{{ line }}</div>
          <h3>All content is provided by slots (f.g. you can nest another accordion)</h3>
          <AccordionList open-multiple-items>
            <AccordionItem>
              <template #summary>Nested accordion item-2 is closed default</template>
              <template #icon>+</template>
              Some nested content
            </AccordionItem>
            <AccordionItem default-opened>
              <template #summary>Nested accordion item-2 is opened default</template>
              <template #icon>+</template>
              Here some text of nested item-2
            </AccordionItem>
          </AccordionList>
        </AccordionItem>
        <AccordionItem id="mId2" disabled>
          <template #summary>This item is disabled you can control it via v-model</template>
          <template #icon> 💀</template>
          You can control it via v-model
        </AccordionItem>
        <AccordionItem v-for="item in dynamicItems" :key="item">
          <template #summary>This item is dynamically added</template>
          <template #icon>D</template>
          {{ item }}
        </AccordionItem>
        <AccordionItem id="mId3">
          <template #summary>Last item here</template>
          <template #icon> 🚀</template>
          <div>
            <h1>
              Please subscribe <a href="https://www.youtube.com/channel/UCxKF1Edfy3LfvAsnveD-OVA">youtube channel</a>,
              <a href="https://t.me/developers_workshop">telegram channel</a>share video, stay stars and likes
            </h1>
          </div>
        </AccordionItem>
      </AccordionList>
    </div>

    <div class="v-model-rep">
      <h3>Props</h3>
      <div>
        Open multiple items
        <input v-model="openMultipleItems" type="checkbox" />
      </div>

      <h3>V-model representation</h3>
      <div v-for="vModelItem in vModelItems" :key="vModelItem[0]">
        {{ vModelItem[0] }}
        <input
          :checked="vModelItem[1]"
          type="checkbox"
          @change="event => onStateControllerChange(vModelItem[0], event)"
        />
      </div>

      <h3>Dynamic items</h3>
      <button @click="addDynamicItem">Add</button>
      <button @click="removeDynamicItem">Remove</button>

      <h3>Block resize</h3>
      <div>now width is: {{ accordionBlockWidthPercents }}%</div>
      <button @click="accordionBlockWidthPercents -= 20">Smaller</button>
      <button @click="accordionBlockWidthPercents += 20">Bigger</button>
    </div>
  </div>
</template>

<style lang="scss">
  @import "./accordion/accordion";

  .sandbox {
    display: flex;
    justify-content: space-between;

    .v-model-rep {
      min-width: 300px;
      margin-left: 50px;
    }
  }

  .adv {
    width: 100vw;
    display: flex;
    justify-content: center;
    border-bottom: 2px solid gray;
    margin-bottom: 50px;

    .image {
      font-size: 150px;
    }
  }
</style>
