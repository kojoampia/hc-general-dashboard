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

describe('Feature e2e test', () => {
  const featurePageUrl = '/feature';
  const featurePageUrlPattern = new RegExp('/feature(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const featureSample = {};

  let feature: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/generalservice/api/features+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/generalservice/api/features').as('postEntityRequest');
    cy.intercept('DELETE', '/services/generalservice/api/features/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (feature) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/generalservice/api/features/${feature.id}`,
      }).then(() => {
        feature = undefined;
      });
    }
  });

  it('Features menu should load Features page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('feature');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Feature').should('exist');
    cy.url().should('match', featurePageUrlPattern);
  });

  describe('Feature page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(featurePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Feature page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/feature/new$'));
        cy.getEntityCreateUpdateHeading('Feature');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', featurePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/generalservice/api/features',
          body: featureSample,
        }).then(({ body }) => {
          feature = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/generalservice/api/features+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [feature],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(featurePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Feature page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('feature');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', featurePageUrlPattern);
      });

      it('edit button click should load edit Feature page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Feature');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', featurePageUrlPattern);
      });

      it('last delete button click should delete instance of Feature', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('feature').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', featurePageUrlPattern);

        feature = undefined;
      });
    });
  });

  describe('new Feature page', () => {
    beforeEach(() => {
      cy.visit(`${featurePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Feature');
    });

    it('should create an instance of Feature', () => {
      cy.get(`[data-cy="name"]`).type('system challenge').should('have.value', 'system challenge');

      cy.get(`[data-cy="items"]`).type('Cedi 24 Division').should('have.value', 'Cedi 24 Division');

      cy.get(`[data-cy="createdDate"]`).type('2022-05-25').should('have.value', '2022-05-25');

      cy.get(`[data-cy="modifiedDate"]`).type('2022-05-25').should('have.value', '2022-05-25');

      cy.get(`[data-cy="createdBy"]`).type('Unbranded').should('have.value', 'Unbranded');

      cy.get(`[data-cy="modifiedBy"]`).type('Ergonomic time-frame').should('have.value', 'Ergonomic time-frame');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        feature = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', featurePageUrlPattern);
    });
  });
});
