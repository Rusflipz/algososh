
describe("Проверка загрузки страницы", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  })

  describe("Проверка статуса кнопки", () => {
    it("Проверка неактивной кнопки", () => {
      cy.contains("Развернуть").as("button");
      cy.get("@button").should("be.disabled");
      cy.get("input").type("test");
      cy.get("@button").should("not.be.disabled")
      cy.get("input").clear()
      cy.get("@button").should("be.disabled")
    })
  })

  describe("Проверка анимации", () => {
    it("Проверка разворота строки", () => {
      cy.get("input").type("1234")
      cy.contains("Развернуть").click();

      cy.get("[class*=circle_circle]")
        .should("have.length", 4)
        .each(($item, index) => {
          if (index === 0) cy.wrap().contains('1')
          if (index === 1) cy.wrap().contains('2')
          if (index === 2) cy.wrap().contains('3')
          if (index === 3) cy.wrap().contains('4')
          if (index === 0 || index === 3) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
            if (index === 0) expect($item).to.contain("1");
            if (index === 2) expect($item).to.contain("4");
          }
        })
      cy.wait(500)
      cy.get("[class*=circle_circle]")
        .each(($item, index) => {
          if (index === 0 || index === 3) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(127, 224, 81)"
            );
            if (index === 0) cy.wrap().contains('4')
            if (index === 2) cy.wrap().contains('1')
          }
        })
      cy.wait(500)
      cy.get("[class*=circle_circle]")
        .each(($item, index) => {
          if (index === 1 || index === 2) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
            if (index === 1) cy.wrap().contains('3')
            if (index === 3) cy.wrap().contains('2')
          }
        })
      cy.wait(500)
      cy.get("[class*=circle_circle]")
        .each(($item, index) => {
          if (index === 1 || index === 2) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(127, 224, 81)"
            );
            if (index === 1) cy.wrap().contains('3')
            if (index === 3) cy.wrap().contains('2')
          }
        })
    })
  })
})