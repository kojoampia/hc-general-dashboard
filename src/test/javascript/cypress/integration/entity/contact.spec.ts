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

describe('Contact e2e test', () => {
  const contactPageUrl = '/contact';
  const contactPageUrlPattern = new RegExp('/contact(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const contactSample = { language: 'EN' };

  let contact: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/services/generalservice/api/contacts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/services/generalservice/api/contacts').as('postEntityRequest');
    cy.intercept('DELETE', '/services/generalservice/api/contacts/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (contact) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/services/generalservice/api/contacts/${contact.id}`,
      }).then(() => {
        contact = undefined;
      });
    }
  });

  it('Contacts menu should load Contacts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('contact');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Contact').should('exist');
    cy.url().should('match', contactPageUrlPattern);
  });

  describe('Contact page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(contactPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Contact page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/contact/new$'));
        cy.getEntityCreateUpdateHeading('Contact');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', contactPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/services/generalservice/api/contacts',
          body: contactSample,
        }).then(({ body }) => {
          contact = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/services/generalservice/api/contacts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [contact],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(contactPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Contact page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('contact');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', contactPageUrlPattern);
      });

      it('edit button click should load edit Contact page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Contact');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', contactPageUrlPattern);
      });

      it('last delete button click should delete instance of Contact', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('contact').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', contactPageUrlPattern);

        contact = undefined;
      });
    });
  });

  describe('new Contact page', () => {
    beforeEach(() => {
      cy.visit(`${contactPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Contact');
    });

    it('should create an instance of Contact', () => {
      cy.get(`[data-cy="title"]`).type('open-source transparent').should('have.value', 'open-source transparent');

      cy.get(`[data-cy="address"]`).type('Global').should('have.value', 'Global');

      cy.get(`[data-cy="street"]`).type('Hallie Burg').should('have.value', 'Hallie Burg');

      cy.get(`[data-cy="code"]`).type('application').should('have.value', 'application');

      cy.get(`[data-cy="city"]`).type('West Ellenberg').should('have.value', 'West Ellenberg');

      cy.get(`[data-cy="state"]`).type('system-worthy Health intuitive').should('have.value', 'system-worthy Health intuitive');

      cy.get(`[data-cy="region"]`).type('Strategist Silver up').should('have.value', 'Strategist Silver up');

      cy.get(`[data-cy="country"]`).type('Liechtenstein').should('have.value', 'Liechtenstein');

      cy.get(`[data-cy="telephone"]`).type('(831) 295-4950 x518').should('have.value', '(831) 295-4950 x518');

      cy.get(`[data-cy="whatsapp"]`).type('Avon').should('have.value', 'Avon');

      cy.get(`[data-cy="facebook"]`).type('open-source').should('have.value', 'open-source');

      cy.get(`[data-cy="twitter"]`).type('infrastructure').should('have.value', 'infrastructure');

      cy.get(`[data-cy="google"]`).type('Greens').should('have.value', 'Greens');

      cy.get(`[data-cy="youtube"]`).type('solution Designer').should('have.value', 'solution Designer');

      cy.get(`[data-cy="lastModified"]`).type('2022-05-25T18:01').should('have.value', '2022-05-25T18:01');

      cy.get(`[data-cy="lastModifiedBy"]`).type('reintermediate B2B').should('have.value', 'reintermediate B2B');

      cy.get(`[data-cy="language"]`).select('FR');

      cy.get(`[data-cy="appointment"]`).type('Nebraska non-volatile').should('have.value', 'Nebraska non-volatile');

      cy.get(`[data-cy="latitude"]`).type('16383').should('have.value', '16383');

      cy.get(`[data-cy="longitude"]`).type('32727').should('have.value', '32727');

      cy.setFieldImageAsBytesOfEntity('image', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="url"]`).type('https://amelie.info').should('have.value', 'https://amelie.info');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        contact = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', contactPageUrlPattern);
    });
  });
});
