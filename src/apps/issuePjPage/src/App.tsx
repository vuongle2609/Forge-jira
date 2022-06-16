import { useEffect, useState } from "react";
import { requestJira, invoke } from "@forge/bridge";
import Papa from "papaparse";

function App() {
  const handleCreateIssues = async (dataArray: any[]) => {
    const dataArrayModified = dataArray;
    dataArrayModified.pop().shift();

    const chunkSize = 49;
    for (let i = 0; i < dataArrayModified.length; i += chunkSize) {
      const chunk = dataArrayModified.slice(i, i + chunkSize);
      const objData: any = {
        issueUpdates: [],
      };

      chunk.forEach((itemArr) => {
        objData.issueUpdates.push({
          update: {},
          fields: {
            summary: itemArr[2],
            issuetype: {
              id: 10005,
            },
            priority: {
              id: "1",
            },
            project: {
              id: 10003,
            },
            // assignee: {

            // }
          },
        });
      });

      const response = await requestJira("/rest/api/3/issue/bulk", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objData),
      });
      console.log(await response.text());
    }
  };

  const getFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const files = e.target.files;
      if (files) {
        Papa.parse(files[0], {
          complete: (results: any) => handleCreateIssues(results.data),
        });
      }
    }
  };

  return (
    <div className="App">
      <input
        type="file"
        name=""
        id=""
        accept=".csv,.xlsx,.xls"
        onChange={getFile}
      />
      {/* <button onClick={setUp}>kladalsjdlk</button> */}
    </div>
  );
}

export default App;
