import { StatusBarAlignment, window } from "vscode"

export function createGistStatusBar(command: string) {
    const gistStatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 100)
    gistStatusBarItem.command = command
    gistStatusBarItem.text = "$(github) Create gist"
    gistStatusBarItem.tooltip = "Click to save terminal output as a private Gist file"

    return gistStatusBarItem
}