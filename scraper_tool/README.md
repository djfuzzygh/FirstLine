# NHS Clinical Data Scraper

A web-based tool to scrape clinical data from NHS Inform and automatically populate the FirstLine offline knowledge base.

## Setup

1. Install dependencies:
```bash
cd scraper_tool
pip install -r requirements.txt
```

2. Run the scraper:
```bash
python scraper.py
```

3. Open your browser to:
```
http://localhost:5001
```

## Usage

1. Paste NHS Inform URLs (one per line) into the textarea
2. Click "Start Scraping"
3. Wait for the scraper to process all pages
4. Data is automatically appended to `web_app/clinical_knowledge.js`

## Features

- ✅ Intelligent parsing of symptoms, red flags, and treatment
- ✅ Automatic tier classification (RED/YELLOW/GREEN)
- ✅ Duplicate detection
- ✅ Real-time progress tracking
- ✅ Beautiful web interface
- ✅ Auto-saves to correct file

## Example URLs

```
https://www.nhsinform.scot/illnesses-and-conditions/infections-and-poisoning/meningitis/
https://www.nhsinform.scot/illnesses-and-conditions/lungs-and-airways/pneumonia/
https://www.nhsinform.scot/illnesses-and-conditions/infections-and-poisoning/sepsis/
```
