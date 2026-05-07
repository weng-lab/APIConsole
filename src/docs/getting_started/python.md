Similar to the command-line query, this example also uses a plain POST
request. However, in addition, this example uses the `requests` library in
Python to provide a thin abstraction. It also shows how to include GraphQL
variables.

```python
import os
import requests

variables = {
  "accession": ["EH38E1516972"],
  "assembly": "grch38"
}

query = """
query cCREQuery($accession: [String!], $assembly: String!) {
  cCREQuery(accession: $accession, assembly: $assembly) {
    coordinates {
        start
        end
        chromosome
      }
      rDHS
      assembly
    }
}
"""

response = requests.post(
    'https://screen.api.wenglab.org/graphql',
    json={ 'query': query, 'variables': variables },
    headers={ 'Authorization': f"Bearer {os.environ['SCREEN_API_KEY']}" }
)
response.raise_for_status()
result = response.json()
print(result)
```

where the `result` is

```json
{
  "data": {
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
}
```
