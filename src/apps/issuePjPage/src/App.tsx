import { useEffect, useState } from "react";
import { requestJira, invoke } from "@forge/bridge";

function App() {
  const [display, setDisplay] = useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const issue = urlParams.get("selectedIssue");

  useEffect(() => {
    const getData = async () => {
      if (issue) {
        const response = await requestJira(`/rest/api/3/issue/${issue}`);
        const data = await response.json();
        if (data.fields.issuetype.name === "Test Set") setDisplay(true);
      }
    };

    const test = async () => {
      console.log("running");
      const issueKey = await invoke("getIssueKey", {});
      console.log("🚀 ~ file: App.tsx ~ line 21 ~ test ~ issueKey", issueKey);
    };

    test();
    getData();
  }, [issue]);

  if (!display)
    return <div className="App">djt con me may deo phai {issue}</div>;

  return <div className="App">djt con me may chinh no {issue}</div>;
}

export default App;
