import { expect } from 'chai';
import sinon from 'sinon';
import { createWatchlistItem } from '../../src/functions/create';
import * as dbModule from '../../src/functions/common/db';
import { mockClient, mockConnectToDatabase } from '../mocks/db-mock';

describe('createWatchlistItem', () => {
  let connectToDatabaseStub: sinon.SinonStub;
  let queryStub: sinon.SinonStub;
  
  beforeEach(() => {
    // Create stubs before each test
    connectToDatabaseStub = sinon.stub(dbModule, 'connectToDatabase').callsFake(mockConnectToDatabase);
    queryStub = sinon.stub(mockClient, 'query');
  });
  
  afterEach(() => {
    // Restore stubs after each test
    sinon.restore();
  });

  it('should add a stock to the watchlist successfully', async () => {
    // Prepare mock data
    const newItem = {
      id: 1,
      user_id: 123,
      symbol: 'AAPL',
      company_name: 'Apple Inc.',
      notes: 'Tech stock',
      created_at: new Date().toISOString()
    };
    
    queryStub.resolves({ rows: [newItem] });
    
    const event = {
      body: JSON.stringify({
        symbol: 'AAPL',
        company_name: 'Apple Inc.',
        notes: 'Tech stock',
        userId: 123
      })
    };

    const response = await createWatchlistItem(event);
    
    expect(response.statusCode).to.equal(201);
    expect(JSON.parse(response.body)).to.deep.equal(newItem);
    expect(queryStub.calledOnce).to.be.true;
    expect(queryStub.firstCall.args[0]).to.include('INSERT INTO watchlist');
  });

  it('should return 400 if request body is missing', async () => {
    const event = { body: null };

    const response = await createWatchlistItem(event);
    
    expect(response.statusCode).to.equal(400);
    expect(JSON.parse(response.body).message).to.equal('Request body is required');
  });

  it('should return 400 if required fields are missing', async () => {
    const event = {
      body: JSON.stringify({
        // Missing symbol and companyName
        notes: 'Tech stock',
        userId: 123
      })
    };

    const response = await createWatchlistItem(event);
    
    expect(response.statusCode).to.equal(400);
    expect(JSON.parse(response.body).message).to.include('required');
  });

  it('should handle database errors gracefully', async () => {
    queryStub.rejects(new Error('Database error'));
    
    const event = {
      body: JSON.stringify({
        symbol: 'AAPL',
        company_name: 'Apple Inc.',
        notes: 'Tech stock',
        userId: 123
      })
    };

    const response = await createWatchlistItem(event);
    
    expect(response.statusCode).to.equal(500);
    expect(JSON.parse(response.body).message).to.equal('Could not create watchlist item');
  });
});