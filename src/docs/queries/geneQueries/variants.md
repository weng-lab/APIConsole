# Get eQTLs data

## fetch eQTLs for given gene
Returns eQTLs from studies like GTEX and OneK1K for given gene
```gql 
query  {
  immuneeQTLsQuery(genes: ["SOX4"]) {
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