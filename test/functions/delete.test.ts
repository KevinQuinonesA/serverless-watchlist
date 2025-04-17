import { expect } from 'chai';
import sinon from 'sinon';
import { deleteWatchlistItem } from '../../src/functions/delete';
import * as dbModule from '../../src/functions/common/db';
import { mockClient, mockConnectToDatabase } from '../mocks/db-mock';

describe('deleteWatchlistItem', () => {
  let connectToDatabaseStub: sinon.SinonStub;
  let queryStub: sinon.SinonStub;
  
  beforeEach(() => {
    connectToDatabaseStub = sinon.stub(dbModule, 'connectToDatabase').callsFake(mockConnectToDatabase);
    queryStub = sinon.stub(mockClient, 'query');
  });
  
  afterEach(() => {
    sinon.restore();
  });

  it('should delete a watchlist item successfully', async () => {
    // Mock successful deletion (1 row affected)
    queryStub.resolves({ rowCount: 1 });
    
    const event = {
      pathParameters: {
        symbol: 'AAPL'
      }
    };

    const response = await deleteWatchlistItem(event);
    
    expect(response.statusCode).to.equal(200);
    expect(JSON.parse(response.body).message).to.equal('Watchlist item deleted successfully');
    expect(queryStub.calledOnce).to.be.true;
    expect(queryStub.firstCall.args[0]).to.include('DELETE FROM watchlist WHERE symbol = $1');
  });

  it('should return 404 if watchlist item is not found', async () => {
    // Mock no rows affected (item not found)
    queryStub.resolves({ rowCount: 0 });
    
    const event = {
      pathParameters: {
        symbol: 'NONEXISTENT'
      }
    };

    const response = await deleteWatchlistItem(event);
    
    expect(response.statusCode).to.equal(404);
    expect(JSON.parse(response.body).message).to.equal('Watchlist item not found');
  });

  it('should return 400 if symbol is not provided', async () => {
    const event = {
      pathParameters: {}
    };

    const response = await deleteWatchlistItem(event);
    
    expect(response.statusCode).to.equal(400);
    expect(JSON.parse(response.body).message).to.equal('Symbol is required');
  });
});