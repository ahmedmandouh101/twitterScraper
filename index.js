const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

dotenv.config();


const twitterAccounts = [
  "https://twitter.com/Mr_Derivatives",
  "https://twitter.com/warrior_0719",
  "https://twitter.com/allstarcharts",
  "https://twitter.com/yuriymatso",
  "https://twitter.com/TriggerTrades",
  "https://twitter.com/AdamMancini4",
  "https://twitter.com/CordovaTrades",
  "https://twitter.com/Barchart",
  "https://twitter.com/RoyLMattox",
];

const ticker = process.env.TICKER || "$TSLA";
const intervalMinutes = parseInt(process.env.INTERVAL) || 15;

async function scrapeTweets() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let totalMentions = 0;

  for (const account of twitterAccounts) {
    console.log(`Scraping account: ${account}`);
    await page.goto(account, { waitUntil: "networkidle2" });

    // Ensure the page is fully loaded
    await page.waitForSelector('[data-testid="tweet"]', { timeout: 10000 });

    // Capture a screenshot for debugging
    await page.screenshot({ path: "screenshot.png" });

    // Scroll down to load more tweets
    await autoScroll(page);

    // Extract tweets and count mentions of the ticker
    const tweets = await page.evaluate((ticker) => {
      const tweetElements = document.querySelectorAll('[data-testid="tweet"]'); // Updated selector
      let count = 0;
      tweetElements.forEach((tweet) => {
        const tweetText = tweet.innerText;
        console.log(tweetText); // Log tweet text to debug
        if (tweetText.includes(ticker)) {
          count++;
        }
      });
      return count;
    }, ticker);

    totalMentions += tweets;
  }

  console.log(
    `'${ticker}' was mentioned '${totalMentions}' times in the last '${intervalMinutes}' minutes.`
  );

  await browser.close();
}


async function autoScroll(page) {
  await page.evaluate(async () => {
    const distance = 100;
    const delay = 100;
    while (true) {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + window.innerHeight >= scrollHeight) break;
      window.scrollBy(0, distance);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  });
}


setInterval(scrapeTweets, intervalMinutes * 60 * 1000);


scrapeTweets();
