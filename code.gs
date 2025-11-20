// Lista de analistas (exemplo fictício)
const ANALYSTS = [
  { id: 1, name: "Analista A" },
  { id: 2, name: "Analista B" },
  { id: 3, name: "Analista C" },
];

// Campo de multiempresa (exemplo)
const MULTI_COMPANY_FIELD = "custom_field_key_here";

const deals = $input.all();
const sd = $getWorkflowStaticData("global");

// Índice da última analista usada entre execuções
let lastIndex = typeof sd.lastIndex === "number" ? sd.lastIndex : -1;

// Mapa global: codigoMulti -> ID da analista
sd.multiMap = sd.multiMap || {};
const multiMap = sd.multiMap;

const out = [];

for (let i = 0; i < deals.length; i++) {
  const deal = deals[i].json;
  const multiCode = deal[MULTI_COMPANY_FIELD];

  let analyst = null;

  if (multiCode && multiMap[multiCode]) {
    analyst = ANALYSTS.find(a => a.id === multiMap[multiCode]);
  }

  if (!analyst) {
    const analystIndex = (lastIndex + 1) % ANALYSTS.length;
    analyst = ANALYSTS[analystIndex];
    multiMap[multiCode] = analyst.id;
    lastIndex = analystIndex;
  }

  const d = new Date();
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const ano = d.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;

  out.push({
    json: {
      deal_id: deal.id,
      deal_title: deal.title,
      new_owner_name: analyst.name,
      new_owner_id: analyst.id,
      date: dataFormatada,
      multi_code: multiCode,
    },
  });
}

return out;
