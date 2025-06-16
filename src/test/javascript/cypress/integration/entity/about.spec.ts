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

describe('About e2e test', () => {
  const aboutPageUrl = '/about';
  const aboutPageUrlPattern = new RegExp('/about(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const aboutSample = {};

  let about: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/generalservice/api/abouts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/generalservice/api/abouts').as('postEntityRequest');
    cy.intercept('DELETE', '/services/generalservice/api/abouts/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (about) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/generalservice/api/abouts/${about.id}`,
      }).then(() => {
        about = undefined;
      });
    }
  });

  it('Abouts menu should load Abouts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('about');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('About').should('exist');
    cy.url().should('match', aboutPageUrlPattern);
  });

  describe('About page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(aboutPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create About page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/about/new$'));
        cy.getEntityCreateUpdateHeading('About');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', aboutPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/generalservice/api/abouts',
          body: aboutSample,
        }).then(({ body }) => {
          about = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/generalservice/api/abouts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [about],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(aboutPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details About page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('about');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', aboutPageUrlPattern);
      });

      it('edit button click should load edit About page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('About');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', aboutPageUrlPattern);
      });

      it('last delete button click should delete instance of About', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('about').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', aboutPageUrlPattern);

        about = undefined;
      });
    });
  });

  describe('new About page', () => {
    beforeEach(() => {
      cy.visit(`${aboutPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('About');
    });

    it('should create an instance of About', () => {
      cy.get(`[data-cy="title"]`).type('HTTP program').should('have.value', 'HTTP program');

      cy.get(`[data-cy="content"]`).type('24/365 Down-sized HTTP').should('have.value', '24/365 Down-sized HTTP');

      cy.get(`[data-cy="language"]`).select('FR');

      cy.get(`[data-cy="createdDate"]`).type('2022-05-25').should('have.value', '2022-05-25');

      cy.get(`[data-cy="modifiedDate"]`).type('2022-05-25').should('have.value', '2022-05-25');

      cy.get(`[data-cy="createdBy"]`).type('multi-byte quantify impactful').should('have.value', 'multi-byte quantify impactful');

      cy.get(`[data-cy="modifiedBy"]`).type('driver Multi-lateral').should('have.value', 'driver Multi-lateral');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        about = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', aboutPageUrlPattern);
    });
  });
});
