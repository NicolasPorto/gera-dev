import { TwoWayConverter } from "../components/TwoWayConverter";
import { csvToJson, jsonToCsv } from "../utils/csvJson";

export default function CsvJsonConverter() {
  return (
    <TwoWayConverter
      toolKey="csv-json"
      forward={{
        id: "csv-to-json",
        labelKey: "CsvParaJson",
        infoKey: "InfoCsvToJson",
        errorKey: "CsvInvalido",
        outLang: "json",
        placeholder: "nome,idade\nMaria,30\nJoão,25",
        convert: (input) => JSON.stringify(csvToJson(input), null, 2),
      }}
      backward={{
        id: "json-to-csv",
        labelKey: "JsonParaCsv",
        infoKey: "InfoJsonToCsv",
        errorKey: "JsonInvalido",
        outLang: null,
        placeholder: '[\n  { "nome": "Maria", "idade": 30 }\n]',
        convert: (input) => jsonToCsv(input),
      }}
    />
  );
}
