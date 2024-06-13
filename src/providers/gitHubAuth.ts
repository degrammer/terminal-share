import { authentication } from 'vscode';

export default async function gitHubAuth(scopes: string[], createIfNone: boolean) {
  const session =
    (await authentication.getSession(
      'github',
      scopes,
      createIfNone ? { createIfNone } : {},
    ));

  return session;

}