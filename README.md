# Save url webtask

POC of webtask

This webtask is deployed at: https://wt-a60565eb9177ca77ab4ed49dd4bd62d9-0.run.webtask.io/stats

## How to deploy
1. Follow install guide at: https://webtask.io/cli
2. `wt create stats.js -s MONGO_URL=mongodb://user:pass@dinstance.mlab.com:1234/stats`

## How to execute
```bash
curl https://wt-a60565eb9177ca77ab4ed49dd4bd62d9-0.run.webtask.io/stats?url=your_url
```

## Licence
[MIT License](http://en.wikipedia.org/wiki/MIT_License)




