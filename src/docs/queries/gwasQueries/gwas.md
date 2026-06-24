# Fetching genome-wide association Studies data

## Query matching gwas studies starting with given studyname prefix
Returns studyid,author,population and other metadata matching given studyname prefix

Due to performance limitations, its recommended to use limit input parameter with these autocomplete queries

```graphql
query {
    getGWASStudiesMetadata(limit: 3, studyname_prefix: ["astro"] )
    {
        studyid
        author
        disease_trait
        has_enrichment_info
        population
        parent_terms
        total_ld_blocks
        ld_blocks_overlapping_ccres
        overlapping_ccres
    }
}

```

## Query All genome-wide association studies 

Returns all GWAS studies along with author, pubmedid. study returns unique value (study) assigned to each study

```graphql
query getAllGWASStudies {
  getAllGwasStudies {
    study
    totalldblocks    
    author
    pubmedid
    studyname    
  }
}

```

## Query GWAS study metadata for given studyid

```graphql
query {
  getGWASStudiesMetadata(
    studyid:  ["36810956-GCST90296476-astrocytoma"]  
  ) {
    studyid
    author
    disease_trait
    has_enrichment_info
    population
    parent_terms
    total_ld_blocks
    ld_blocks_overlapping_ccres
    overlapping_ccres
    journal
    link
    study
    initial_sample_size
    replication_sample_size
    platform
    layer_2_terms
    total_ld_blocks
    genotyping_technology
  }
}
```

## Query SNPs for given genome-wide association study 

Returns SNPs, genomic regions, rsquare value for given study

```graphql
query  {
  getSNPsforGivenGWASStudy(studyid: ["36810956-GCST90296476-astrocytoma"]) {
    snpid
    ldblock
    studyid
    ldblocksnpid
    rsquare
    stop
    start
    chromosome    
  }
}

```

## Query GWAS celltype enrichment data

Returns celltype enrichment data for given study value

```graphql

query {
  getGWASBiosampleEnrichmentQuery(studyid: ["36810956-GCST90296476-astrocytoma"]) {
    studyid
    fc
    accession
    fdr
    pvalue
    celltype
    
  }
}

```


## Get cCREs overlapped by given study

```graphql
query {
  getCcresforGivenGWASStudy(studyid: ["36810956-GCST90296476-astrocytoma"]) {
    ccre
    ldblocksnpid
    rsquare
    studyid
    snpid
  }
}
```


<br />