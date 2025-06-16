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

describe('FaqCategory e2e test', () => {
  const faqCategoryPageUrl = '/faq-category';
  const faqCategoryPageUrlPattern = new RegExp('/faq-category(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const faqCategorySample = { label: 'Garden Cambridgeshire' };

  let faqCategory: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/generalservice/api/faq-categories+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/generalservice/api/faq-categories').as('postEntityRequest');
    cy.intercept('DELETE', '/services/generalservice/api/faq-categories/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (faqCategory) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/generalservice/api/faq-categories/${faqCategory.id}`,
      }).then(() => {
        faqCategory = undefined;
      });
    }
  });

  it('FaqCategories menu should load FaqCategories page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('faq-category');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('FaqCategory').should('exist');
    cy.url().should('match', faqCategoryPageUrlPattern);
  });

  describe('FaqCategory page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(faqCategoryPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create FaqCategory page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/faq-category/new$'));
        cy.getEntityCreateUpdateHeading('FaqCategory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', faqCategoryPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/generalservice/api/faq-categories',
          body: faqCategorySample,
        }).then(({ body }) => {
          faqCategory = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/generalservice/api/faq-categories+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [faqCategory],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(faqCategoryPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details FaqCategory page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('faqCategory');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', faqCategoryPageUrlPattern);
      });

      it('edit button click should load edit FaqCategory page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('FaqCategory');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', faqCategoryPageUrlPattern);
      });

      it('last delete button click should delete instance of FaqCategory', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('faqCategory').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', faqCategoryPageUrlPattern);

        faqCategory = undefined;
      });
    });
  });

  describe('new FaqCategory page', () => {
    beforeEach(() => {
      cy.visit(`${faqCategoryPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('FaqCategory');
    });

    it('should create an instance of FaqCategory', () => {
      cy.get(`[data-cy="label"]`).type('Tactics').should('have.value', 'Tactics');

      cy.get(`[data-cy="description"]`).type('Gloves Delaware Cambridgeshire').should('have.value', 'Gloves Delaware Cambridgeshire');

      cy.get(`[data-cy="matIcon"]`).type('quantify Avon').should('have.value', 'quantify Avon');

      cy.get(`[data-cy="color"]`).type('green').should('have.value', 'green');

      cy.get(`[data-cy="svgIcon"]`).type('cross-platform copying Colorado').should('have.value', 'cross-platform copying Colorado');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        faqCategory = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', faqCategoryPageUrlPattern);
    });
  });
});
