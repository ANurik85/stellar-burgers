describe('Конструктор бургера', () => {
  beforeEach(() => {
    // Подставляем моковые токены авторизации
    cy.setCookie('accessToken', 'fake-token');
    localStorage.setItem('refreshToken', 'fake-refresh-token');

    // Мокаем все API запросы
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as(
      'login'
    );
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.visit('/');
    cy.wait('@getIngredients');

    // Создаем алиасы только для элементов, которые существуют при загрузке
    cy.get('[data-cy=ingredient-60d3b41abdacab0026a733c6]')
      .should('exist')
      .as('bunIngredient');
    cy.get('[data-cy=ingredient-60d3b41abdacab0026a733cc]')
      .should('exist')
      .as('sauceIngredient');
    cy.get('[data-cy=constructor-ingredients]')
      .should('exist')
      .as('constructorIngredients');
    cy.get('[data-cy=order-button]').should('exist').as('orderButton');
  });

  it('должен добавлять ингредиент в конструктор', () => {
    // Добавляем булку
    cy.get('@bunIngredient').contains('Добавить').click();

    // Создаем алиас для элемента constructor-bun-top
    cy.get('[data-cy=constructor-bun-top]').as('constructorBunTop');

    // Проверяем добавление булки
    cy.get('@constructorBunTop')
      .should('exist')
      .contains('Краторная булка N-200i');

    // Добавляем соус
    cy.get('@sauceIngredient').contains('Добавить').click();

    // Проверяем добавление соуса
    cy.get('@constructorIngredients').contains('Соус Spicy-X').should('exist');
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    // Открываем модальное окно и создаем алиасы для модальных элементов
    cy.get('@bunIngredient')
      .find('[data-cy=ingredient-link]')
      .click({ force: true });

    // После открытия модального окна создаем алиасы для его элементов
    cy.get('[data-cy=ingredient-modal]')
      .should('be.visible')
      .as('ingredientModal');
    cy.get('[data-cy=ingredient-modal-name]')
      .should('be.visible')
      .as('modalName')
      .should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy=modal-close]').should('be.visible').as('modalClose');
    cy.get('[data-cy=modal-overlay]').should('exist').as('modalOverlay');

    // Закрываем по крестику
    cy.get('@modalClose').click();
    cy.get('@ingredientModal').should('not.exist');

    // Открываем снова
    cy.get('@bunIngredient')
      .find('[data-cy=ingredient-link]')
      .click({ force: true });

    // Снова создаем алиасы, так как модальное окно - это новый элемент
    cy.get('@ingredientModal');
    cy.get('[data-cy=modal-overlay]').should('exist').as('modalOverlay');

    // Закрываем через оверлей
    cy.get('@modalOverlay').click({ force: true });
    cy.get('@ingredientModal').should('not.exist');
  });

  it('должен создавать заказ', () => {
    // Добавляем булку
    cy.get('@bunIngredient').contains('Добавить').click();

    // Создаем алиас для элемента constructor-bun-top
    cy.get('[data-cy=constructor-bun-top]').as('constructorBunTop');

    // Проверяем добавление булки
    cy.get('@constructorBunTop')
      .should('exist')
      .contains('Краторная булка N-200i');

    // Добавляем соус
    cy.get('@sauceIngredient').contains('Добавить').click();
    cy.get('@constructorIngredients').contains('Соус Spicy-X').should('exist');

    // Нажимаем кнопку заказа
    cy.get('@orderButton').click();

    // После открытия модального окна заказа создаем для него алиасы
    cy.get('[data-cy=order-modal]').should('be.visible').as('orderModal');
    cy.get('[data-cy=order-number]')
      .should('be.visible')
      .as('orderNumber')
      .should('contain', '12345');
    cy.get('[data-cy=modal-close]').should('be.visible').as('modalClose');

    // Закрываем модальное окно
    cy.get('@modalClose').click();

    // Проверяем очистку конструктора
    cy.get('@constructorIngredients').children().should('have.length', 1);
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});

// Исп-н в тесте baseUrl, 
