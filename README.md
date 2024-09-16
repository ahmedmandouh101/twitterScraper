# Twitter Stock Symbol Scraper

This Node.js tool scrapes Twitter accounts for mentions of specific stock symbols (cashtags) at regular intervals. It does not use the Twitter API and relies on web scraping techniques with Puppeteer.

## Features

- Scrapes tweets from a list of specified Twitter accounts.
- Searches for mentions of a specified stock symbol (cashtag) in the tweets.
- Reports the number of mentions in the last specified time interval.

## Getting Started

To use this tool, follow these instructions to set up and run the scraper.

### Prerequisites

- Node.js (v14 or later)
- npm (Node package manager)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ahmedmandouh101/twitterScraper.git
   cd twitter-scraper
2. ** dotenv **
   ```bash
   TICKER=$TSLA
   INTERVAL=15

4. ** output example **
   ```bash
   '$TSLA' was mentioned '10' times in the last '15' minutes.
  

4.** Run the scraper **
  ```bash
  node index.js





