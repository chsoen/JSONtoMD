import { useState } from "react";
import "./App.css";
import { marked } from "marked";

function App() {
  const [userJSONInput, setUserJSONInput] = useState("");
  const [MDoutput, setMDoutput] = useState("Markdown Output");
  const [MDCodeOutput, setMDCodeOutput] = useState("Markdown Code Output");
  let markdownOutput: string = "";
  const filteredKeyList: string[] = ["ID"];

  function JSONtoMD(jsonObject: unknown, tabAmount: string) {
    switch (typeof jsonObject) {
      case "number":
      case "string": {
        markdownOutput += ": " + jsonObject;
        console.log(markdownOutput);
        return;
      }
      case "object": {
        for (const key in jsonObject) {
          if (filterKey(key)) {
            return;
          }
          markdownOutput += "\n" + tabAmount + "- " + key;
          const value: unknown = jsonObject[key as keyof object];
          JSONtoMD(value, tabAmount + "  ");
        }
        return;
      }
    }
  }

  function filterKey(key: string): boolean {
    return filteredKeyList.includes(key);
  }

  return (
    <>
      <p>Hello</p>
      <input
        value={userJSONInput}
        placeholder="Insert JSON here."
        type="text"
        onChange={(e) => {
          setUserJSONInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          try {
            markdownOutput = "";
            JSONtoMD(JSON.parse(userJSONInput) as object, "");
            setMDCodeOutput(markdownOutput);
            /* eslint-disable  @typescript-eslint/no-unsafe-member-access */
            /* eslint-disable  @typescript-eslint/no-unsafe-call */
            setMDoutput(marked.parse(markdownOutput) as string);
          } catch {
            console.error("Could not parse user input");
          }
        }}
      >
        Submit
      </button>
      <div id="preview" dangerouslySetInnerHTML={{ __html: MDoutput }}></div>
      <code className="code">{MDCodeOutput}</code>
    </>
  );
}

export default App;
