<script setup lang="ts">
const currencyStore = useCurrencyStore();

const { westunion, commercial } = storeToRefs(currencyStore);

onMounted(() => {
  currencyStore.getWestunion();
  currencyStore.getCommercial();
});

const selected = ref("real");

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

function changeSelected(value: string) {
  selected.value = value;
}
</script>

<template>
  <div class="bg-slate-900 h-screen w-screen flex justify-center">
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
          class="bg-blue-200 px-3 py-3 rounded-md cursor-pointer"
          @click="changeSelected('pesos')"
        >
          <div class="">Pesos</div>
          <div class="font-bold text-lg">
            {{ toCurrencyARS(getPesos() ?? 0) || "$ 0,00" }}
          </div>
        </div>
        <div
          class="bg-yellow-200 px-3 py-3 rounded-md cursor-pointer"
          @click="changeSelected('pesosWestunion')"
        >
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
