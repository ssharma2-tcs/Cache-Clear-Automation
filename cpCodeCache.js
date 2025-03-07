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
    await driver.switchTo().window(tabs[0]);
    await driver.sleep(3000);

    // staging
    // let sfccCode = ['1329410', '1329415', '1329811'];
    // let pwaCode = ['1329411', '1329419', '1329810'];

    //production
    let sfccCode = ["1338995", "1338998", "1339116"];
    let pwaCode = ["1338996", "1338999", "1339114"];

    await driver.get("https://control.akamai.com/apps/fast-purge/#/");
    // await driver.get("chrome://newtab");
    await driver.sleep(3000);
    await driver
      .wait(
        until.elementLocated(By.css("label[for='akam-radio-3-input']")),
        10000
      )
      .click();
    await driver.sleep(2000);

    for (let i = 0; i < sfccCode.length + pwaCode.length; i++) {
      if (i == sfccCode.length) await driver.sleep(1000 * 60 * 5);
      if (i < sfccCode.length) {
        await cPCodeCacheClear(sfccCode[i], i);
      } else {
        await cPCodeCacheClear(pwaCode[i % sfccCode.length], i);
      }
    }

    async function cPCodeCacheClear(c, i) {
      let code = await driver.wait(
        until.elementLocated(
          By.css(`input[placeholder="Select CP codes (max 100)"]`)
        ),
        10000
      );
      await code.click();
      await code.clear();
      await code.sendKeys(c);
      // await driver.sleep(2000);
      // await driver.findElement(By.className("core-2-0 pulsar")).click();
      await driver.sleep(3000);
      let selectTd = await driver.wait(
        until.elementLocated(
          By.css(
            `td[class="cdk-cell cdk-column-cpCode akam-cell akam-column-cpCode ng-star-inserted"]`
          )
        ),
        10000
      );
      let seletedCode = (await selectTd.getText()).trim();

      if (seletedCode.includes(c)) {
        selectTd.click();
      }
      await driver.sleep(2000);
      let selectEnv = await driver.wait(
        until.elementLocated(
          By.css(`span[translate="template.ccu.networkType.prod"]`)
        ),
        10000
      );
      await selectEnv.click();
      await driver.sleep(2000);
      let selectCacheway = await driver.wait(
        until.elementLocated(
          By.css(`span[translate="template.ccu.refreshType.purge"]`)
        ),
        10000
      );
      await selectCacheway.click();
      await driver.sleep(3000);
      let cacheIt = await driver.wait(
        until.elementLocated(
          By.css(`button[translate="template.ccu.button.submit"]`)
        ),
        10000
      );
      await cacheIt.click();
      await driver.sleep(3000);
      selectTd.click();
      console.log("Cache is cleared for CP Code - ", c);
      await driver.sleep(2000);
      if (i === sfccCode.length + pwaCode.length - 1) {
        await driver.get("chrome://newtab");
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
})();

//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir=C:\Users\ssharma2\Downloads\chrome
