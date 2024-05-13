<script setup lang="ts">
const isOpen = ref(false);

const currencyStore = useCurrencyStore();

const { myWestunion, myCommercial, apiWestunion, apiCommercial } =
  storeToRefs(currencyStore);

function close() {
  isOpen.value = false;
}

function open() {
  isOpen.value = true;
}

defineExpose({ open });
</script>

<template>
  <UButton
    class="fixed top-6 right-4"
    icon="i-heroicons-cog-8-tooth"
    size="xl"
    rounded
    variant="ghost"
    @click="isOpen = true"
  />
  <UModal
    v-model="isOpen"
    :ui="{
      container: 'flex min-h-full items-center justify-center text-center',
    }"
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <div>
        <div class="mb-1">Pesos</div>
        <div>
          <UInput
            v-model="myCommercial"
            class="w-full"
            size="xl"
            color="gray"
            type="number"
            input-class="text-center py-4 text-2xl"
          />
          <div class="text-sm mt-1">{{ apiCommercial }}</div>
        </div>
        <div class="mt-8 mb-1">Pesos WestUnion</div>
        <UInput
          v-model="myWestunion"
          class="w-full"
          size="xl"
          color="gray"
          type="number"
          input-class="text-center py-4 text-2xl"
        />
        <div class="text-sm mt-1">{{ apiWestunion }}</div>
      </div>
      <UButton class="mt-6 float-right mb-5" @click="close">Fechar</UButton>
    </UCard>
  </UModal>
</template>
