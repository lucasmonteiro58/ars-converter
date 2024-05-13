export const useCurrencyStore = defineStore("currency", () => {
  const westunion = ref();
  const commercial = ref();

  const loadingWestunion = ref(false);
  const loadingCommercial = ref(false);

  async function getWestunion() {
    try {
      loadingWestunion.value = true;
      const res = await fetch(
        "https://www.westernunion.com/wuconnect/prices/catalog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            header_request: { version: "0.5", request_type: "PRICECATALOG" },
            sender: {
              client: "WUCOM",
              channel: "WWEB",
              funds_in: "EB",
              curr_iso3: "BRL",
              cty_iso2_ext: "BR",
              send_amount: "100.00",
            },
            receiver: { curr_iso3: "ARS", cty_iso2_ext: "AR", cty_iso2: "AR" },
          }),
        }
      );
      const data = await res.json();
      westunion.value = data.services_groups[0].pay_groups[0].fx_rate;
    } catch (error) {
      console.error(error);
    } finally {
      loadingWestunion.value = false;
    }
  }

  async function getCommercial() {
    try {
      loadingCommercial.value = true;
      const res = await fetch(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/brl.json"
      );
      const data = await res.json();
      commercial.value = data?.brl?.ars;
    } catch (error) {
      console.error(error);
    } finally {
      loadingCommercial.value = false;
    }
  }

  return {
    westunion,
    commercial,
    loadingWestunion,
    getWestunion,
    loadingCommercial,
    getCommercial,
  };
});
