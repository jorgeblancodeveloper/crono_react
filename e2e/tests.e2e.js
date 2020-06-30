
import { Selector } from 'testcafe'; // import Selector

// For now we run our project locally
fixture `Navigation`.page `http://localhost:3000`;


test('test navigation', async t => {
    // assertion to check if the only h1 tag on the page contains the required text
      await t.expect(Selector('.navigator .component-button:first-child').innerText).contains('Main');
    });
    

    test('test contenido', async t => {
      const panel_main = Selector('.panel_main').exists;
      const panel_config = Selector('.panel_config').exists;
      const panel_sessions = Selector('.panel_sessions').exists;
      const configtBtn = await Selector('.navigator .component-button:nth-child(2)');
      const sessionstBtn = await Selector('.navigator .component-button:nth-child(3)');
      await t.click(configtBtn);
      // assertion to check if the only h1 tag on the page contains the required text
        await t
        .expect(panel_main).ok().click(configtBtn).expect(panel_config).ok()
        
        .click(sessionstBtn).expect(panel_sessions).ok()
      });
      

