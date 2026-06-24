# Getting variant details

## Query genomic region based on given SNP Id
Returns genomic region for given rsID.

```graphql
query  {
  snpQuery(assembly: "GRCh38", snpids: "rs9466027") {
    id
    coordinates {
      chromosome
      start
      end
    }
  }
}
```

## Query SNPs within given genomic region
Returns list of SNPs overlapping given genomic region.

```graphql
 query {
    snpQuery(assembly: "GRCh38", coordinates: [ {
     chromosome: "chr7",
     start:   11571770,
     end: 11571779
    }]) {
      id
      coordinates {
        chromosome
        start
        end
      }
    }
  }

```


## Query matching SNP ids starting with given name prefix  

Returns SNP ids matching given name prefix along with genomic region.

Due to performance limitations, its recommended to use limit input parameter with these autocomplete queries.

```graphql
query {
     snpAutocompleteQuery(snpid: "rs78", assembly: "grch38", limit: 3) {
         id
         coordinates {
             chromosome
             start
             end
         }
     }
 }
```

## Get immune eQTLs for given SNP
Returns eQTLs from studies like GTEX and OneK1K for given SNP Id

```graphql
query {
  immuneeQTLsQuery(genes: ["rs9466027"]) {
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

##  Fetch variants associated with significant changes in immune-related phenotypes for a given SNP Id


```graphql
query  {
  immuneGWASLdrQuery(snps:  ["rs9466027"]) {
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
