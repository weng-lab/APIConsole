
## Get representative peaks for given cCRE

Get representative peaks for given cCRE

```graphql

query  {
  getcCRERPeaksQuery(accession: ["EH38E3314260"]) {
    rpeak_id
    rpeak_chromosome
    rpeak_start
    rpeak_stop
    tf
    metadata
    tf_number
    decorator_stop
    decorator_start
    decorator_chromosome
    decorator_tf_number
    strand
  }
}

```