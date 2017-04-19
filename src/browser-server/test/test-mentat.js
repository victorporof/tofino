import expect from 'expect';
import MentatConnection from '../mentat';

describe('mentat', () => {
  it('should transact', () => {
    const schema = `[
      {:db/ident :movie/title
      :db/valueType :db.type/string
      :db/cardinality :db.cardinality/one}
    ]`;
    MentatConnection.transact(schema);

    const data = `[
      {:db/id -101
      :movie/title "Die Hard"}
    ]`;
    MentatConnection.transact(data);
  });

  it('should query', () => {
    const input = `[:find ?e
                :where
                [?e :movie/title "Die Hard" _]]`;
    const result = MentatConnection.query(input);
    expect(result.resultsLength).toEqual(1);
  });
});
