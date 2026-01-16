#!/bin/bash
# MedGemma Enhancement Launcher
# This script sets up the environment and runs the enhancement

echo "🚀 MedGemma Knowledge Base Enhancement"
echo "======================================"
echo ""

# Check if FIRSTLINE_MODE is set
if [ -z "$FIRSTLINE_MODE" ]; then
    echo "⚠️  FIRSTLINE_MODE not set. Setting to 'actual'..."
    export FIRSTLINE_MODE=actual
fi

echo "📋 Mode: $FIRSTLINE_MODE"
echo ""

# Check if we're on Kaggle
if [ -d "/kaggle" ]; then
    echo "📍 Running on Kaggle"
    echo ""
fi

# Run enhancement
echo "🔄 Starting enhancement..."
echo ""

cd "$(dirname "$0")"
python3 enhance_direct.py

echo ""
echo "✅ Done!"
