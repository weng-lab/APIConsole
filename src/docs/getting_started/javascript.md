Building on the previous two examples, this example in JavaScript uses the
[`graphql-request`](https://github.com/prisma-labs/graphql-request) library to
completely abstract over the underlying POST request.

```javascript
import { request } from "graphql-request";

const query = `query cCREQuery($accession: [String!], $assembly: String!) {
  cCREQuery(accession: $accession, assembly: $assembly) {
    coordinates {
      start
      end
      chromosome
    }
    rDHS
    assembly
  }
}`;

const variables = {
  accession: ["EH38E1516972"],
  assembly: "grch38",
};

const headers = {
  Authorization: `Bearer ${process.env.SCREEN_API_KEY}`,
};

request(
  "https://screen.api.wenglab.org/graphql",
  query,
  variables,
  headers,
).then(console.log);
```

which prints

```json
{
  "cCREQuery": [
    {
      "coordinates": {
        "start": 5280547,
        "end": 5280897,
        "chromosome": "chr11"
      },
      "rDHS": "EH38D2417606",
      "assembly": "grch38"
    }
  ]
}
```
