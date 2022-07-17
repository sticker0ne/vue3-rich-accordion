<div style="width: 100%; display: flex; align-content: center; justify-content: center"><img src="https://sticker0ne.github.io/vue3-rich-accordion/img.png" /></div>
<p align="center" style="font-size: 30px">Vue 3 rich accordion component</span>
<p align="center">
  <a href="https://sticker0ne.github.io/vue3-rich-accordion/">Demo</a> |
  <a href="https://github.com/sticker0ne/vue3-rich-accordion">Repository</a> |
  <a href="https://www.npmjs.com/package/vue3-rich-accordion">NPM</a> |
  <a href="https://www.youtube.com/watch?v=ubtEdHwq8QU">YouTube</a>
</p>

<h2>Features</h2>
<ul>
    <li>Zero dependency</li>
    <li>SSR friendly</li>
    <li>Nuxt friendly</li>
    <li>Fully typed with typescript</li>
    <li>Block resize friendly</li>
    <li>v-model controlled</li>
    <li>Default-open feature</li>
    <li>Dynamic content reaction</li>
    <li>Dynamic items allowed</li>
    <li>Animated (optional, controlled by css)</li>
    <li>Exclude closed item's content from tab loop</li>
    <li>All content is provided by slots</li>
    <li>Css fully customizable</li>
    <li>W3C validator passed</li>
</ul>
<h2>Installation</h2>

via yarn
```shell
yarn add vue3-rich-accordion
```
or via npm

```shell
npm i vue3-rich-accordion
```

<h2>Adding to project</h2>
via plugin

```typescript
// ./src/main.ts

import { createApp } from "vue";
import App from "./App.vue";
import { useAccordion } from "vue3-rich-accordion";
import "vue3-rich-accordion/accordion-library-styles.css";
//import "vue3-rich-accordion/accordion-library-styles.scss"; if you wanna to use scss

const app = createApp(App);
app.use(useAccordion);

app.mount("#app");
```

or you can use via importing sfc

```typescript
// SomeVueComponent.vue
<script setup>
    import { AccordionList, AccordionItem } from "vue3-rich-accordion";
</script>
```
<h2>Usage</h2>

You can see the full example on <a href="https://sticker0ne.github.io/vue3-rich-accordion/">demo page</a>
Also you can see code example in <a href="https://github.com/sticker0ne/vue3-rich-accordion/blob/main/src/components/AccordionSandbox.vue/">AccordionSandbox.vue</a>

<h2>Props</h2>

```typescript
    interface IAccordionListProps {
    openMultipleItems ? : boolean;      // if true you can open multiple items same time
    state ? : Record<string, boolean>;  // representing list state {"id1": true, "id2": false} - means 1 item is opened and 2 one is closed
    setClosePropertyTime ? : number;    // do not touch if everything is ok. it is used to order closing and animation 
}

interface IAccordionItemProps {
    id?: string;                //Custom id. It is the key in the state object of AccordionList
    defaultOpened?: boolean;    // if provided item would be opened by default. 
    disabled?: boolean          // is item disabled or not 
}
```

<h2>Slots</h2>

```vue

<AccordionItem>
    <template #summary>Item summary</template>
    <template #icon>☝️</template>
    <h3>Main content</h3>
</AccordionItem>
```

<h2>Customization + Styles</h2>
You can use default styles via

```typescript
import "vue3-rich-accordion/accordion-library-styles.css";
//import "vue3-rich-accordion/accordion-library-styles.scss"; if you wanna to use scss
```

You also can clone this files and change for your design

Default icon is described in styles, you can change it via styles customization
