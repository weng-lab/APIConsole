
## Get ENTEx data for given cCRE

Returns ENTEx data for input accession

```graphql

query {
  entexQuery(accession: "EH38E1310345"){
    assay
    accession
    hap1_count
    hap2_count
    hap1_allele_ratio
    p_betabinom
    experiment_accession
    tissue
    donor    
    imbalance_significance
  }
}

```

## Get ENTEx Active Annotations for given cCRE genomic region 

Returns ENTEx active tissues and supoorting assays for input accession genomic coordinates

```graphql

query {
    entexActiveAnnotationsQuery(coordinates:  { chromosome: "chr1", start: 1000068, end: 1000409 }) {
        tissue
        assay_score
    }
}

```