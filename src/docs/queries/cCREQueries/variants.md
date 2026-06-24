# Searching related variants for given cCRE

## Query intersecting SNPs for a cCRE 

Returns intersecting SNPs for a cCRE genomic region

```graphql
query {
  snpQuery(coordinates: {chromosome: "chr19",start: 50417519,end: 50417853},
  assembly: "GRCh38"
) {
    id
    coordinates {
      chromosome
      start
      end      
    }
    
  }
}

```

## Fetch variants associated with significant changes in immune-related phenotypes for a given cCRE

```graphql
query {
  immuneGWASLdrQuery( icres: ["EH38E3314260"]
) {
    snp_chr
    snp_end
    snp_start
    snpid
    icre
    ref_allele
    author
    effect_allele
    zscore
    study_source
    disease
    icre_chr
    icre_start
    icre_end
    icre_class
    study
    study_link
  }
}
```


## Fetch eQTLs for a given cCRE

```graphql
query {
  immuneeQTLsQuery(ccre: ["EH38E3314260"]) {
    rsid
    genename
    study
    fdr
    celltype
    ref
    chromosome
    position
    alt
    variant_id
    pval_nominal
    ccre
    slope
    spearmans_rho
  }
}
```