const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("dotenv").config();
(async function example() {
  let options = new chrome.Options();
  options.options_["debuggerAddress"] = "localhost:9222";

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.manage().window().maximize();
    let tabs = await driver.getAllWindowHandles();
    // console.log("open tab", tabs);
    await driver.switchTo().window(tabs[0]);
    await driver.sleep(3000);
    await driver.get("https://control.akamai.com/apps/fast-purge/#/");
    await driver.sleep(5000);
    await driver.findElement(By.css("label[for='akam-radio-2-input']")).click();
    await driver.sleep(2000);
    let url = await driver.findElement(By.css("textarea[placeholder]"));
    await url.click();
    await url.sendKeys(
      "https://staging.stuartweitzman.com/api/get-slas-access-token"
    );
    await driver.sleep(2000);
    await driver.findElement(By.className("core-2-0 pulsar")).click();
    let selectEnv = await driver.findElement(
      By.css(`span[translate="template.ccu.networkType.stage"]`)
    );
    await selectEnv.click();
    await driver.sleep(2000);
    let selectCacheway = await driver.findElement(
      By.css(`span[translate="template.ccu.refreshType.purge"]`)
    );
    await selectCacheway.click();
    await driver.sleep(3000);
    let cacheIt = await driver.findElement(
      By.css(`button[translate="template.ccu.button.submit"]`)
    );
    await cacheIt.click();
  } catch (e) {
    console.log("Error triggered");
  } finally {
    await driver.quit();
  }
})();

//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir=C:\Users\ssharma2\Downloads\chrome
