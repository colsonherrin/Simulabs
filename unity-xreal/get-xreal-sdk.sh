#!/bin/sh
# Downloads the XREAL SDK 3.1.0 Unity package next to this script (it is too large and not ours to commit).
cd "$(dirname "$0")" && curl -L -o com.xreal.xr.tar.gz https://public-resource.xreal.com/download/XREALSDK_Release_3.1.0.20251125/com.xreal.xr.tar.gz && ls -l com.xreal.xr.tar.gz
