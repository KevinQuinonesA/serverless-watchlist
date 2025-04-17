import { expect } from 'chai';
import sinon from 'sinon';
import { getWatchlistItems } from '../../src/functions/read';
import * as dbModule from '../../src/functions/common/db';
import { mockClient, mockConnectToDatabase } from '../mocks/db-mock';

describe('getWatchlistItems', () => {
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

  it('should return a list of watchlist items', async () => {
    // Prepare mock data
    const mockData = {
      rows: [
        {
          id: 1,
          user_id: 123,
          symbol: 'AAPL',
          company_name: 'Apple Inc.',
          notes: 'Tech stock'
        }
      ]
    };
    
    // Set up the query stub to return mock data
    queryStub.resolves(mockData);
    
    const event = {
      queryStringParameters: {
        userId: '123'
      }
    };

    const response = await getWatchlistItems(event);
    
    expect(response.statusCode).to.equal(200);
    expect(JSON.parse(response.body)).to.deep.equal(mockData.rows);
    expect(queryStub.calledOnce).to.be.true;
    expect(queryStub.firstCall.args[0]).to.include('SELECT * FROM watchlist WHERE user_id = $1');
  });

  it('should handle database errors gracefully', async () => {
    queryStub.rejects(new Error('Database connection error'));
    
    const event = {
      queryStringParameters: {
        userId: '123'
      }
    };

    const response = await getWatchlistItems(event);
    
    expect(response.statusCode).to.equal(500);
    expect(JSON.parse(response.body).message).to.equal('Could not retrieve watchlist items');
  });
});