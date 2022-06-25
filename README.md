# [Electron fiddle] Electron protocol stream issue

Elementmain process does not close the stream when the request is canceled by the renderer process. Copy `bigfile.gif` file from the main process to the location called by createReadStream and start through Electron Fiddle.