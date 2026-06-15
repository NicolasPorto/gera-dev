import { TwoWayConverter } from "../components/TwoWayConverter";
import { jsonToYaml, yamlToJson } from "../utils/jsonYaml";

export default function JsonYamlConverter() {
  return (
    <TwoWayConverter
      toolKey="json-yaml"
      forward={{
        id: "json-to-yaml",
        labelKey: "JsonParaYaml",
        infoKey: "InfoJsonToYaml",
        errorKey: "JsonInvalido",
        outLang: null,
        placeholder: '{\n  "nome": "Maria",\n  "tags": ["a", "b"]\n}',
        convert: (input) => jsonToYaml(input),
      }}
      backward={{
        id: "yaml-to-json",
        labelKey: "YamlParaJson",
        infoKey: "InfoYamlToJson",
        errorKey: "YamlInvalido",
        outLang: "json",
        placeholder: "nome: Maria\ntags:\n  - a\n  - b",
        convert: (input) => yamlToJson(input),
      }}
    />
  );
}
