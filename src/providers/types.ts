export interface Gist {
    files: GistFiles
    description?: string | undefined
    isPublic: boolean
  }
  
  export interface GistFiles {
    [key: string]: {
      content: string
    }
  }
  
  export interface GistResponse {
    data: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      html_url: string | undefined
    }
  }
  