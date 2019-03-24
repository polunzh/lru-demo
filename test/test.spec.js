require('mocha');

const assert = require('assert');
const LRUCache = require('../index');

describe('lrucache', () => {
  it('should size will be 0 when the cache is init', () => {
    const cache = new LRUCache();
    assert.equal(cache.size, 0);
  });

  it('should the default max cache size is 3', () => {
    const cache = new LRUCache();
    cache.set(1);
    cache.set(2);
    cache.set(3);
    assert.equal(cache.size, 3);
    cache.set(10);
    assert.equal(cache.size, 3);
  });

  it('should the max cache size is set by constructor', () => {
    const cacheSize = 10;
    const cache = new LRUCache({ maxSize: cacheSize });

    for (let i = 0; i <= cacheSize; i++) {
      cache.set(i);
    }

    assert.equal(cache.size, cacheSize);
  });

  it('should the most used at top', () => {
    const cache = new LRUCache();
    cache.set(1);
    cache.set(2);
    assert.equal(cache.top, 2);
    cache.set(1);
    assert.equal(cache.top, 1);
  });
});
