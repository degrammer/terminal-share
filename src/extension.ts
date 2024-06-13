

import { ExtensionContext, commands } from 'vscode';

import { gistCommand } from './commands/createGist';
import { createGistStatusBar } from './gistStatusBar';

export function activate(context: ExtensionContext) {
    const gistCommandName = 'command.saveAsGist'
    const gistStatusBarItem = createGistStatusBar(gistCommandName)
    context.subscriptions.push(gistStatusBarItem)
    context.subscriptions.push(commands.registerCommand(gistCommandName, gistCommand))
    gistStatusBarItem.show()
 

}

// This method is called when your extension is deactivated
export function deactivate() { }
