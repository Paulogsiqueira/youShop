import { expect, browser, $ } from "@wdio/globals";

describe("Product Page", () => {
  it("choose product, fill in buyer information and payment information and complete the order", async () => {
    // Entrar na pagina principal
    await browser.url("http://localhost:5173/");

    // Selecionar o primeiro produto
    const button = await $(".productCard-btn");
    await button.waitForDisplayed();
    await button.click();

    // Entrar na pagina do produto selecionado
    const productContainer = await $(".product-container");
    await productContainer.waitForDisplayed({ timeout: 5000 });

    const buttonProduct = await $(".submit-btn");
    await buttonProduct.waitForDisplayed();

    await buttonProduct.click();

    // Entrar na pagina de Delivery para informar dados do comprador
    const nameField = await $("#completeName"); 
    const phoneField = await $("#phone"); 
    const emailField = await $("#email"); 
    const cepField = await $("#cep"); 

    // Atribuindo valor aos campos
    await nameField.setValue('Paulo Gustavo Siqueira');
    await phoneField.setValue('14997820009');
    await emailField.setValue('pgustavo-siqueira@hotmail.com');
    await cepField.setValue('17015440');

    const buttonCep = await $(".cep-btn");
    await buttonCep.waitForDisplayed();

    await buttonCep.click();

    await browser.pause(1000);

    const buttonDelivery = await $(".delivery-btn");
    await buttonDelivery.click();

    // Entrar na pagina de Payment para informar dados do pagamento
    const paymentContainer = await $(".payment-form");
    await paymentContainer.waitForDisplayed({ timeout: 5000 });

    const radioGroup = await $('.payment-options__group');
    await radioGroup.waitForDisplayed();

    const pixRadioButton = await $('input[value="pix"]');
    await pixRadioButton.click();
    expect(await pixRadioButton.isSelected()).toBe(true);


    //Esperar container de pagamento pix aparecer
    const pixContainer = await $(".pix-option");
    await pixContainer.waitForDisplayed({ timeout: 5000 });
    
    await browser.pause(1000);

    const pixButton = await $('.pix-btn');
    await pixButton.click();

    //Entrar na página de compra finalizada
    const purchaseCompletedContainer = await $(".purchase-completed");
    await purchaseCompletedContainer.waitForDisplayed({ timeout: 5000 });
    
    await browser.pause(5000);
  });
});
