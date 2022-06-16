import { useEffect, useState } from "react";
import { requestJira, invoke } from "@forge/bridge";
import Papa from "papaparse";

function App() {
  const handleCreateIssues = (dataArray: any[]) => {
    const dataArrayModified = dataArray;
    dataArrayModified.pop().shift();

    if (dataArrayModified.length !== 0) {
      dataArrayModified.forEach((itemArr) => {
        // console.log(itemArr);
        const objData = `{
          "update": {},
          "fields": {
            "summary": "Main order flow broken",
            "parent": {
              "key": "PROJ-123"
            },
            "issuetype": {
              "id": "10000"
            },
            "components": [{
              "id": "10000"
            }],
            "customfield_20000": "06/Jul/19 3:25 PM",
            "customfield_40000": {
              "type": "doc",
              "version": 1,
              "content": [{
                "type": "paragraph",
                "content": [{
                  "text": "Occurs on all orders",
                  "type": "text"
                }]
              }]
            },
            "customfield_70000": [
              "jira-administrators",
              "jira-software-users"
            ],
            "project": {
              "id": "10000"
            },
            "description": {
              "type": "doc",
              "version": 1,
              "content": [{
                "type": "paragraph",
                "content": [{
                  "text": "Order entry fails when selecting supplier.",
                  "type": "text"
                }]
              }]
            },
            "reporter": {
              "id": "5b10a2844c20165700ede21g"
            },
            "fixVersions": [{
              "id": "10001"
            }],
            "customfield_10000": "09/Jun/19",
            "priority": {
              "id": "20000"
            },
            "labels": [
              "bugfix",
              "blitz_test"
            ],
            "timetracking": {
              "remainingEstimate": "5",
              "originalEstimate": "10"
            },
            "customfield_30000": [
              "10000",
              "10002"
            ],
            "customfield_80000": {
              "value": "red"
            },
            "security": {
              "id": "10000"
            },
            "environment": {
              "type": "doc",
              "version": 1,
              "content": [{
                "type": "paragraph",
                "content": [{
                  "text": "UAT",
                  "type": "text"
                }]
              }]
            },
            "versions": [{
              "id": "10000"
            }],
            "duedate": "2019-05-11",
            "customfield_60000": "jira-software-users",
            "customfield_50000": {
              "type": "doc",
              "version": 1,
              "content": [{
                "type": "paragraph",
                "content": [{
                  "text": "Could impact day-to-day work.",
                  "type": "text"
                }]
              }]
            },
            "assignee": {
              "id": "5b109f2e9729b51b54dc274d"
            }
          }
        }`;
      });
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

  const setUp = async () => {
    const objData = `{
      "update": {},
      "fields": {
        "summary": "Main order flow broken",
        "parent": {
          "key": "PROJ-123"
        },
        "issuetype": {
          "id": "10000"
        },
        "components": [{
          "id": "10000"
        }],
        "customfield_20000": "06/Jul/19 3:25 PM",
        "customfield_40000": {
          "type": "doc",
          "version": 1,
          "content": [{
            "type": "paragraph",
            "content": [{
              "text": "Occurs on all orders",
              "type": "text"
            }]
          }]
        },
        "customfield_70000": [
          "jira-administrators",
          "jira-software-users"
        ],
        "project": {
          "id": "10000"
        },
        "description": {
          "type": "doc",
          "version": 1,
          "content": [{
            "type": "paragraph",
            "content": [{
              "text": "Order entry fails when selecting supplier.",
              "type": "text"
            }]
          }]
        },
        "reporter": {
          "id": "5b10a2844c20165700ede21g"
        },
        "fixVersions": [{
          "id": "10001"
        }],
        "customfield_10000": "09/Jun/19",
        "priority": {
          "id": "20000"
        },
        "labels": [
          "bugfix",
          "blitz_test"
        ],
        "timetracking": {
          "remainingEstimate": "5",
          "originalEstimate": "10"
        },
        "customfield_30000": [
          "10000",
          "10002"
        ],
        "customfield_80000": {
          "value": "red"
        },
        "security": {
          "id": "10000"
        },
        "environment": {
          "type": "doc",
          "version": 1,
          "content": [{
            "type": "paragraph",
            "content": [{
              "text": "UAT",
              "type": "text"
            }]
          }]
        },
        "versions": [{
          "id": "10000"
        }],
        "duedate": "2019-05-11",
        "customfield_60000": "jira-software-users",
        "customfield_50000": {
          "type": "doc",
          "version": 1,
          "content": [{
            "type": "paragraph",
            "content": [{
              "text": "Could impact day-to-day work.",
              "type": "text"
            }]
          }]
        },
        "assignee": {
          "id": "5b109f2e9729b51b54dc274d"
        }
      }
    }`;

    const response = await requestJira("/rest/api/3/issue", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: objData,
    });
    console.log(await response.text());
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
      <button onClick={setUp}>kladalsjdlk</button>
    </div>
  );
}

export default App;
