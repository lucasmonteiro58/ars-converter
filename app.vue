<script setup lang="ts">
const currencyStore = useCurrencyStore();

const { westunion, commercial } = storeToRefs(currencyStore);

onMounted(() => {
  currencyStore.getWestunion();
  currencyStore.getCommercial();
});

const selected = ref("real");

const options = [
  { label: "Real", value: "real", color: "green" },
  { label: "Pesos", value: "pesos", color: "blue" },
  { label: "Pesos WestUnion", value: "pesosWestunion", color: "yellow" },
];

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

function toCurrencyBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function toCurrencyARS(value: number) {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}
</script>

<template>
  <div class="bg-slate-900 h-screen w-screen flex justify-center">
    <div class="flex px-4 py-4 flex-col w-full sm:max-w-[400px]">
      <div class="flex justify-between">
        <div class="flex flex-col gap-2 text-white mb-4 mt-4">
          <URadio
            v-for="option of options"
            :key="option.value"
            v-model="selected"
            v-bind="option"
            :color="options.find((o) => o.value === selected)?.color ?? 'black'"
          >
            <template #label>
              <span class="text-white text-md">{{ option.label }}</span>
            </template>
          </URadio>
        </div>
        <div class="flex justify-center rounded-md">
          <BrasilFlag
            v-if="selected === 'real'"
            class="w-[120px] max-h-[80px]"
          />
          <ArgFlag v-if="selected === 'pesos'" class="w-[120px] max-h-[80px]" />
          <WestUnion
            v-if="selected === 'pesosWestunion'"
            class="w-[120px] max-h-[80px]"
          />
        </div>
      </div>
      <UInput
        v-model="input"
        class="w-full"
        size="xl"
        color="gray"
        type="number"
        input-class="text-center py-4 text-2xl"
      />
      <div class="mt-4 flex flex-col gap-2">
        <div class="bg-green-200 px-3 py-3 rounded-md">
          <div class="">BRL</div>
          <div class="font-bold text-lg">
            {{ toCurrencyBRL(getReal() ?? 0) || "R$ 0,00" }}
          </div>
        </div>
        <div class="bg-blue-200 px-3 py-3 rounded-md">
          <div class="">Pesos</div>
          <div class="font-bold text-lg">
            {{ toCurrencyARS(getPesos() ?? 0) || "$ 0,00" }}
          </div>
        </div>
        <div class="bg-yellow-200 px-3 py-3 rounded-md">
          <div class="">Pesos WestUnion</div>
          <div class="font-bold text-lg">
            {{ toCurrencyARS(getPesosWestunion() ?? 0) || "$ 0,00" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
* {
  font-family: "Poppins", sans-serif;
}
</style>
