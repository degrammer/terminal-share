import { AuthenticationSession, window } from "vscode"
import { Octokit } from "octokit"

import { Gist, GistResponse } from "./types"

export default async function createGist({ description, isPublic, files}: Gist, session: AuthenticationSession) {
    try {
        const octokit = new Octokit({
            auth: session.accessToken,
            request: {
                fetch,
            },
        })

        return octokit.request('POST /gists', {
            description,
            public: isPublic,
            files,
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'X-GitHub-Api-Version': '2022-11-28',
            },
        }) as Promise<GistResponse>

    } catch (error) {
        window.showErrorMessage(`Failed to create Gist, details: ${(error as any).message}`)
    }

}