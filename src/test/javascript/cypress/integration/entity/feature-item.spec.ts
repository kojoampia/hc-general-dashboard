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

describe('FeatureItem e2e test', () => {
  const featureItemPageUrl = '/feature-item';
  const featureItemPageUrlPattern = new RegExp('/feature-item(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const featureItemSample = {};

  let featureItem: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/generalservice/api/feature-items+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/generalservice/api/feature-items').as('postEntityRequest');
    cy.intercept('DELETE', '/services/generalservice/api/feature-items/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (featureItem) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/generalservice/api/feature-items/${featureItem.id}`,
      }).then(() => {
        featureItem = undefined;
      });
    }
  });

  it('FeatureItems menu should load FeatureItems page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('feature-item');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FeatureItem').should('exist');
    cy.url().should('match', featureItemPageUrlPattern);
  });

  describe('FeatureItem page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(featureItemPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FeatureItem page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/feature-item/new$'));
        cy.getEntityCreateUpdateHeading('FeatureItem');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', featureItemPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/generalservice/api/feature-items',
          body: featureItemSample,
        }).then(({ body }) => {
          featureItem = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/generalservice/api/feature-items+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [featureItem],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(featureItemPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FeatureItem page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('featureItem');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', featureItemPageUrlPattern);
      });

      it('edit button click should load edit FeatureItem page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FeatureItem');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', featureItemPageUrlPattern);
      });

      it('last delete button click should delete instance of FeatureItem', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('featureItem').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', featureItemPageUrlPattern);

        featureItem = undefined;
      });
    });
  });

  describe('new FeatureItem page', () => {
    beforeEach(() => {
      cy.visit(`${featureItemPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FeatureItem');
    });

    it('should create an instance of FeatureItem', () => {
      cy.get(`[data-cy="name"]`).type('networks Metal').should('have.value', 'networks Metal');

      cy.setFieldImageAsBytesOfEntity('photo', 'integration-test.png', 'image/png');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        featureItem = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', featureItemPageUrlPattern);
    });
  });
});
