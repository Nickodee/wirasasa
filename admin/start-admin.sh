#!/bin/bash
cd "$(dirname "$0")"
echo "Starting WiraSasa Admin Panel..."
echo "Current directory: $(pwd)"
NODE_OPTIONS='--max-old-space-size=4096' npm run dev
