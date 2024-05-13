<script setup lang="ts">
import type { ModalConfig } from "#build/components";

const currencyStore = useCurrencyStore();

const {
  westunion,
  commercial,
  apiWestunion,
  apiCommercial,
  myCommercial,
  myWestunion,
  loadingCommercial,
  loadingWestunion,
} = storeToRefs(currencyStore);

onMounted(() => {
  getCurrency();
});

function getCurrency() {
  currencyStore.getWestunion();
  currencyStore.getCommercial();
}

const selected = ref("real");
const refModal = ref(null) as Ref<InstanceType<typeof ModalConfig> | null>;

const input = ref(1);

function getReal() {
  switch (selected.value) {
    case "real":
      return input.value;
    case "pesos":
      return input.value / commercial.value;
    case "pesosWestunion":
      return input.value / westunion.value;
  }
}

function getPesos() {
  switch (selected.value) {
    case "real":
      return input.value * commercial.value;
    case "pesos":
      return input.value;
    case "pesosWestunion":
      return (input.value / westunion.value) * commercial.value;
  }
}

function getPesosWestunion() {
  switch (selected.value) {
    case "real":
      return input.value * westunion.value;
    case "pesos":
      return (input.value / commercial.value) * westunion.value;
    case "pesosWestunion":
      return input.value;
  }
}

function toCurrencyBRL(value: number | undefined) {
  return value?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function toCurrencyARS(value: number | undefined) {
  return value?.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

function changeSelected(value: string) {
  selected.value = value;
}

function openModal() {
  refModal.value?.open();
}
function clear() {
  myWestunion.value = undefined;
  myCommercial.value = undefined;
}
</script>

<template>
  <div class="bg-slate-900 h-screen w-screen flex justify-center">
    <UButton
      class="fixed top-6 left-4"
      icon="i-heroicons-arrow-path-16-solid"
      size="xl"
      color="gray"
      rounded
      variant="ghost"
      @click="getCurrency"
    />
    <div class="flex px-4 py-4 flex-col w-full sm:max-w-[400px]">
      <div class="flex justify-center rounded-md mb-6">
        <BrasilFlag v-if="selected === 'real'" class="w-[400px] h-[100px]" />
        <ArgFlag v-if="selected === 'pesos'" class="w-[400px] h-[100px]" />
        <WestUnion
          v-if="selected === 'pesosWestunion'"
          class="w-[100px] h-[100px]"
        />
      </div>
      <UInput
        v-model="input"
        class="w-full"
        size="xl"
        color="gray"
        type="number"
        input-class="text-center py-4 text-2xl"
      />
      <div class="mt-4 flex flex-col gap-2 text-slate-900">
        <div
          class="bg-green-200 px-3 py-3 rounded-md cursor-pointer"
          @click="changeSelected('real')"
        >
          <div class="">BRL</div>
          <div class="font-bold text-lg">
            {{ toCurrencyBRL(getReal() ?? 0) || "R$ 0,00" }}
          </div>
        </div>
        <div
          class="bg-blue-200 px-3 py-3 rounded-md cursor-pointer relative"
          @click="changeSelected('pesos')"
        >
          <div class="">Pesos</div>
          <div class="font-bold text-lg">
            <span v-if="!loadingCommercial">{{
              toCurrencyARS(getPesos() ?? 0) || "$ 0,00"
            }}</span>
            <UIcon v-else name="i-eos-icons-loading" dynamic />
          </div>
        </div>
        <div
          class="bg-yellow-200 px-3 py-3 rounded-md cursor-pointer"
          @click="changeSelected('pesosWestunion')"
        >
          <div class="">Pesos WestUnion</div>
          <div class="font-bold text-lg">
            <span v-if="!loadingWestunion">{{
              toCurrencyARS(getPesosWestunion() ?? 0) || "$ 0,00"
            }}</span>
            <UIcon v-else name="i-eos-icons-loading" dynamic />
          </div>
        </div>
        <div class="rounded-md px-2 py-1 mt-5 flex justify-between">
          <div @click="openModal">
            <div class="text-blue-200">
              <span :class="myCommercial && 'line-through'">{{
                toCurrencyARS(apiCommercial)
              }}</span>
              <span>
                {{ toCurrencyARS(myCommercial) }}
              </span>
            </div>
            <div class="text-yellow-200">
              <span :class="myWestunion && 'line-through'">{{
                toCurrencyARS(apiWestunion)
              }}</span>
              <span>
                {{ toCurrencyARS(myWestunion) }}
              </span>
            </div>
          </div>
          <div>
            <UButton
              icon="i-heroicons-x-circle"
              variant="ghost"
              color="gray"
              size="xl"
              @click="clear"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <NuxtPwaManifest />
  <ModalConfig ref="refModal" />
</template>
<style>
* {
  font-family: "Poppins", sans-serif;
}
</style>
