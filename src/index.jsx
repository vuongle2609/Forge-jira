import ForgeUI, { render, Fragment, Text, IssuePanel } from '@forge/ui';
import Resolver from "@forge/resolver";

const resolver = new Resolver();

resolver.define('getIssueKey', async (req) => {
  const { projectId, issueKey } = req.context.extensionContext;
  return issueKey
});

export const handler = resolver.getDefinitions();
