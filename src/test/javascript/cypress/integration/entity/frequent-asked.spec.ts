import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('FrequentAsked e2e test', () => {
  const frequentAskedPageUrl = '/frequent-asked';
  const frequentAskedPageUrlPattern = new RegExp('/frequent-asked(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const frequentAskedSample = {};

  let frequentAsked: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/generalservice/api/frequent-askeds+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/generalservice/api/frequent-askeds').as('postEntityRequest');
    cy.intercept('DELETE', '/services/generalservice/api/frequent-askeds/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (frequentAsked) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/generalservice/api/frequent-askeds/${frequentAsked.id}`,
      }).then(() => {
        frequentAsked = undefined;
      });
    }
  });

  it('FrequentAskeds menu should load FrequentAskeds page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('frequent-asked');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FrequentAsked').should('exist');
    cy.url().should('match', frequentAskedPageUrlPattern);
  });

  describe('FrequentAsked page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(frequentAskedPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FrequentAsked page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/frequent-asked/new$'));
        cy.getEntityCreateUpdateHeading('FrequentAsked');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', frequentAskedPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/generalservice/api/frequent-askeds',
          body: frequentAskedSample,
        }).then(({ body }) => {
          frequentAsked = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/generalservice/api/frequent-askeds+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [frequentAsked],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(frequentAskedPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FrequentAsked page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('frequentAsked');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', frequentAskedPageUrlPattern);
      });

      it('edit button click should load edit FrequentAsked page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FrequentAsked');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', frequentAskedPageUrlPattern);
      });

      it('last delete button click should delete instance of FrequentAsked', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('frequentAsked').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', frequentAskedPageUrlPattern);

        frequentAsked = undefined;
      });
    });
  });

  describe('new FrequentAsked page', () => {
    beforeEach(() => {
      cy.visit(`${frequentAskedPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FrequentAsked');
    });

    it('should create an instance of FrequentAsked', () => {
      cy.get(`[data-cy="question"]`).type('Investment Music').should('have.value', 'Investment Music');

      cy.get(`[data-cy="answer"]`).type('Investment overriding proactive').should('have.value', 'Investment overriding proactive');

      cy.get(`[data-cy="category"]`).type('virtual').should('have.value', 'virtual');

      cy.get(`[data-cy="createdDate"]`).type('2022-05-25').should('have.value', '2022-05-25');

      cy.get(`[data-cy="createdBy"]`).type('Metal').should('have.value', 'Metal');

      cy.get(`[data-cy="modifiedDate"]`).type('2022-05-25').should('have.value', '2022-05-25');

      cy.get(`[data-cy="modifiedBy"]`).type('Kids hacking').should('have.value', 'Kids hacking');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        frequentAsked = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', frequentAskedPageUrlPattern);
    });
  });
});
