#!/bin/bash
# Efficient MedGemma Enhancement Launcher

echo "🚀 EFFICIENT MedGemma Enhancement"
echo "=================================="
echo ""
echo "⚡ Using SINGLE-PASS method (50% faster)"
echo ""

export FIRSTLINE_MODE=actual

cd "$(dirname "$0")"
python3 enhance_efficient.py

echo ""
echo "✅ Done!"
