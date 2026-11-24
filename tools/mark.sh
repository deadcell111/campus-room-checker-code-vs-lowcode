#!/usr/bin/env bash
# Appends a timestamp mark to evidence/timing_log.txt. Usage: tools/mark.sh LABEL "note"
cd "$(dirname "$0")/.." && echo "$(date +%s) $(date '+%F %T') $1 $2" >> evidence/timing_log.txt
