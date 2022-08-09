describe("Проверка загрузки страницы", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  describe("Проверка статуса кнопки", () => {
    it("Проверка неактивной кнопки", () => {
      cy.contains("Добавить").as("button");
      cy.get("@button").should("be.disabled");
      cy.get("input").type("123");
      cy.get("@button").should("not.be.disabled");
      cy.get("input").clear();
      cy.get("@button").should("be.disabled");
    });
  });

  describe("Проверка анимации", () => {
    it("Проверка добавления элементов", () => {
      cy.get("input").type("H");
      cy.contains("Добавить").click();
      cy.get("[class*=stack-page_circleMain")
        .should("have.length", 1)
        .each(($el) => {
          expect($el).to.contain("H");
          expect($el).to.contain("0");
          expect($el).to.contain("top");

        });
      cy.get("[class*=circle_circle]")
        .should("have.length", 1)
        .each(($item) => {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(210, 82, 225)"
          );
        })
      cy.wait(500);
      cy.get("[class*=circle_circle]")
        .should("have.length", 1)
        .each(($item) => {
          cy.wrap($item).should(
            "have.css",
            "border",
            "4px solid rgb(0, 50, 255)"
          );
        })
      cy.get("input").type("I");
      cy.contains("Добавить").click();
      cy.get("[class*=stack-page_circleMain]")
        .should("have.length", 2)
        .each(($el, index) => {
          if (index === 0) {
            expect($el).to.contain("H");
            expect($el).to.contain("0");
          }
          else if (index === 1) {
            expect($el).to.contain("I");
            expect($el).to.contain("1");
            expect($el).to.contain("top");
          }
        });
      cy.get("[class*=circle_circle]")
        .should("have.length", 2)
        .each(($item, index) => {
          if (index === 1) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
          }
        })
      cy.wait(500);
      cy.get("[class*=circle_circle]")
        .should("have.length", 2)
        .each(($item, index) => {
          if (index === 1) {
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(0, 50, 255)"
            );
          }
        })
    });
    it("Проверка удаления элементов", () => {
      cy.get("input").type("1");
      cy.contains("Добавить").click();
      cy.wait(1500);
      cy.get("input").type("2");
      cy.contains("Добавить").click();
      cy.wait(500);
      cy.contains("Удалить").click()
      cy.get("[class*=circle_circle]")
        .should("have.length", 2)
        .each(($item, index) => {
          if (index === 1)
            cy.wrap($item).should(
              "have.css",
              "border",
              "4px solid rgb(210, 82, 225)"
            );
        })
      cy.wait(500);
      cy.get("[class*=stack-page_circleMain]")
        .should("have.length", 1)
        .each(($item) => {
          expect($item).to.contain("1");
          expect($item).to.contain("top");
          expect($item).to.contain("0");
        })
      cy.contains("Удалить").click();
      cy.get("[class*=circle_content]").should("have.length", 0);
    })

    it("Проверка очистки", () => {
      cy.get("input").type("1");
      cy.contains("Добавить").click();
      cy.wait(500);
      cy.get("input").type("2");
      cy.contains("Добавить").click();
      cy.wait(500);
      cy.contains("Очистить").click()
      cy.wait(500);
      cy.get("[class*=stack-page_circleMain]").should("have.length", 0);
    });
  });
});
