import { window, commands, env, ProgressLocation, Uri } from 'vscode'
import stripAnsi from 'strip-ansi'

import createGist from '../providers/gist'
import gitHubAuth from '../providers/gitHubAuth'

export async function gistCommand() {

    if (window.activeTerminal) {
        commands.executeCommand('workbench.action.terminal.selectAll')
        commands.executeCommand('workbench.action.terminal.copySelection')
        const text = await env.clipboard.readText()
        const gistText = stripAnsi(text)
        const createGistProgress = await window.withProgress(
            {
                location: ProgressLocation.Notification,
                title: 'Creating gist ...',
                cancellable: true,
            },
            async () => {
                const session = await gitHubAuth(['gist'], true)
                if (!session) {
                    throw new Error('You must authenticate with your GitHub credentials to create a gist')
                }
                const createdGist = await createGist({
                    isPublic: false,
                    files: {
                        ['terminal-share.md']: {
                            content: `\`\`\`sh ${gistText} \`\`\``
                        },
                    },
                }, session)

                return createdGist;
            },
        )

        const option = await window.showInformationMessage(
            'Your terminal content has been save to a Gist file!',
            'Open',
            'Cancel',
        )

        if (option === 'Open' && createGistProgress) {
            env.openExternal(Uri.parse(`${createGistProgress.data?.html_url}`))
        }

    } else {
        // No terminal is opened
        window.showInformationMessage('Terminal window is not opened.')
    }
}