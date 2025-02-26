const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
require("dotenv").config();

(async function example() {
  // let options = new chrome.Options();
  // // options.options_["debuggerAddress"] = "localhost:9222";

  // options.addArguments(
  //   "user-data-dir=C:/Users/ssharma2/AppData/Local/Google/Chrome/User Data"
  // );
  // options.addArguments("profile-directory=Default");
  // options.excludeSwitches(["enable-automation"]);
  // // // options.addArguments("load-extension=C:/Users/ssharma2/AppData/Local/Google/Chrome/User Data/Default/Extensions/bhghoamapcdpbohphigoooaddinpkbai/8.0.1_0/")
  // let driver = await new Builder()
  //   .forBrowser("chrome")
  //   .setChromeOptions(options)
  //   .build();

  let options = new chrome.Options();
  options.options_["debuggerAddress"] = "localhost:9222";

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.manage().window().maximize();

    // await driver.get("https://control.akamai.com/apps/auth/");
    // await driver.sleep(5000);
    // let username = await driver.findElement(By.css("input[name='username']"));
    // await username.sendKeys(`${process.env.EMAIL}`);
    // await driver.sleep(2000);
    // await driver.findElement(By.css("button[name='next-btn']")).click();
    // await driver.sleep(2000);
    // let pass = await driver.findElement(By.css("input[type='password']"));
    // await pass.sendKeys(`${process.env.PASSWORD}`, Key.RETURN);
    // await driver.sleep(3000);
    // let otp = await driver.findElement(By.css("input[name='otp-code-0']"));
    // await otp.click();
    // await driver.sleep(10000);
    // let submit = await driver.findElement(
    //   By.css("button[translate='auth.verificationForm.doneBtnText']")
    // );
    // await submit.click();
    // await driver.sleep(7000);
    
    await driver.get("https://control.akamai.com/apps/fast-purge/#/");
    let cachetags = [
      "coachRetailJP_prod_global",
      "coachRetailJP_prod_home",
      "coachRetailJP_prod_category",
      "coachRetailJP_prod_product",
      "coachRetailJP_prod_search",
      "coachRetailJP_prod_content",
      "coachOutletJP_prod_global",
      "coachOutletJP_prod_home",
      "coachOutletJP_prod_category",
      "coachOutletJP_prod_product",
      "coachOutletJP_prod_search",
      "coachOutletJP_prod_content",
      "katespadeJP_prod_global",
      "katespadeJP_prod_home",
      "katespadeJP_prod_category",
      "katespadeJP_prod_product",
      "katespadeJP_prod_search",
      "katespadeJP_prod_content",
    ];

    // let cachetags = [
    //   "coachRetailJP_stage_global",
    //   "coachRetailJP_stage_home",
    //   "coachRetailJP_stage_category",
    //   "coachRetailJP_stage_product",
    //   "coachRetailJP_stage_search",
    //   "coachRetailJP_stage_content"
    // ];

    for (let i = 0; i < cachetags.length; i++) {
      await driver.sleep(3000);
      await driver
        .findElement(By.css("label[for='akam-radio-4-input']"))
        .click();
      await driver.sleep(3000);
      let input = await driver.wait(until.elementLocated(By.css(
        `input[placeholder="Type a valid cache tag, and press Enter or Tab after each tag entered"]`
      ))
       ,10000 
      );
      await input.click();
      await input.sendKeys(cachetags[i]);
      await driver.sleep(2000);
      await driver.findElement(By.className("core-2-0 pulsar")).click();

      await driver.sleep(2000);
      let selectEnv = await driver.findElement(
        By.css(`span[translate="template.ccu.networkType.prod"]`)
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
      console.log("Cache is cleared for ",cachetags[i]);
      await driver.sleep(4000);
    }

    // await driver.findElement(By.className("akam-tag-input-tags_input akam-tag-input-container_input ng-pristine ng-valid ng-touched")).sendKeys("Sourav");

    // await driver.get("chrome://newtab");
    // await driver.switchTo().window((await driver.getAllWindowHandles())[0]);
    // await otp.sendKeys(Key.CONTROL, "v");
    // await otp.sendKeys("111111");

    // await driver.sleep(2000);
    // await driver.get('https://control.akamai.com/apps/fast-purge/#/');
    // await driver.findElement(By.css(`span[class="${akam-radio__label-content[2]}"]`)).click();
  } finally {
    await driver.quit();
  }
})();
