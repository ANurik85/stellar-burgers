describe('Конструктор бургера', () => {
  beforeEach(() => {
    // Подставляем моковые токены авторизации
    cy.setCookie('accessToken', 'fake-token');
    localStorage.setItem('refreshToken', 'fake-refresh-token');

    //Мокаем авторизацию
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', 'api/auth/login', {
      fixture: 'login.json'
    }).as('login');

    // Перехватываем запросы к API
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.visit('http://localhost:4000');
  });

  it('должен добавлять ингредиент в конструктор', () => {
    // Находим ингредиент и добавляем его в конструктор
    cy.get('[data-cy=ingredient-60d3b41abdacab0026a733c6]')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=constructor-bun-top]')
      .contains('Краторная булка N-200i')
      .should('exist');

    // Добавляем соус
    cy.get('[data-cy=ingredient-60d3b41abdacab0026a733cc]')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist');
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    // Открываем модальное окно
    cy.get('[data-cy=ingredient-60d3b41abdacab0026a733c6]')
      .find('[data-cy=ingredient-link]')
      .click({ force: true });
    cy.get('[data-cy=ingredient-modal]').should('be.visible');

    // Проверяем данные в модальном окне
    cy.get('[data-cy=ingredient-modal-name]').should(
      'contain',
      'Краторная булка N-200i'
    );

    // Закрываем по крестику
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=ingredient-modal]').should('not.exist');

    // Снова открываем модальное окно
    cy.get('[data-cy=ingredient-60d3b41abdacab0026a733c6]')
      .find('[data-cy=ingredient-link]')
      .click({ force: true });
    cy.get('[data-cy=ingredient-modal]').should('be.visible');

    // Закрываем по клику на оверлей
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=ingredient-modal]').should('not.exist');
  });

  it('должен создавать заказ', () => {
    // Добавляем булку
    cy.get('[data-cy=ingredient-60d3b41abdacab0026a733c6]')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=constructor-bun-top]')
      .contains('Краторная булка N-200i')
      .should('exist');

    // Добавляем соус
    cy.get('[data-cy=ingredient-60d3b41abdacab0026a733cc]')
      .contains('Добавить')
      .click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус Spicy-X')
      .should('exist');

    // Оформляем заказ
    cy.get('[data-cy=order-button]').click();

    // Проверяем модальное окно заказа
    cy.get('[data-cy=order-modal]').should('be.visible');
    cy.get('[data-cy=order-number]').should('contain', '12345');

    // Закрываем модальное окно
    cy.get('[data-cy=modal-close]').click();

    // Проверяем, что конструктор очистился
    cy.get('[data-cy=constructor-ingredients]')
      .children()
      .should('have.length', 1);
  });

  afterEach(() => {
    // Очищаем токены после тестов
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
