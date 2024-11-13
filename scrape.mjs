import { Builder, By } from "selenium-webdriver";

async function scrapeWebsite(url) {
  // Initialize the WebDriver (using Chrome in this example)
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the URL
    await driver.get(url);

    // Wait for the page to load and elements to be available
    await driver.sleep(2000); // You may adjust this based on the page load time

    // Get the page content
    const pageSource = await driver.getPageSource();
    console.log(pageSource);

    // Example of finding elements by CSS selector (e.g., all links)
    let links = await driver.findElements(By.css("a"));
    for (let link of links) {
      let href = await link.getAttribute("href");
      console.log(href);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    // Quit the WebDriver
    await driver.quit();
  }
}

// Get URL from command line arguments
const url = process.argv[2];
if (!url) {
  console.error("Please provide a URL as an argument.");
  process.exit(1);
}

scrapeWebsite(url);
